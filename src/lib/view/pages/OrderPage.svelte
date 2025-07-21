<script lang="ts">
	import {OrderRepository} from "$lib/repository/OrderRepository";
	import OrderItemCard from "$lib/view/components/OrderItemCard.svelte";
	import {MenuUtils} from "$lib/view/utils/MenuUtils";
	import EditOrderToppingsModal from "$lib/view/components/modals/EditOrderToppingsModal.svelte";
	import type {SelectedFood} from "$lib/domain/dto";
	import {OrderStore} from "$lib/stores/OrderStore";
	import ConfirmModal from "$lib/view/components/modals/ConfirmModal.svelte";
	import {OrderCouponInfoStore} from "$lib/stores/OrderCouponInfoStore";
	import {CouponRepository} from "$lib/repository/CouponRepository";
	import {CustomerCouponsStore} from "$lib/stores/CustomerCouponsStore";
	import {EnabledItemCouponsStore} from "$lib/stores/EnabledItemCouponsStore";
	import type {CouponReward, FoodPortion} from "$lib/domain/models";

	let orderPriceTotal: number = NaN;
	let currentItemForToppings: SelectedFood | null = null;
	let description: string

	async function loadOrder(): Promise<void> {
		OrderStore.setValue(await OrderRepository.getCurrentItems());
		if ($CustomerCouponsStore.length === 0) {
			CustomerCouponsStore.setValue(await CouponRepository.getCurrentUserCoupons());
		}
		OrderCouponInfoStore.setValue(await CouponRepository.getCurrentUserOrderCouponInfo());
		if ($OrderStore) {
			EnabledItemCouponsStore.setValue(new Set($OrderStore!.items.filter(isItemEnabledForSelection).map(item => item.id)));
		}
		description = $OrderStore && $OrderStore.description ? $OrderStore.description : "";
		if ($OrderStore && $OrderStore.items.some(item => item.food.toppings.length > 0)) {
			setCurrentItemForToppings($OrderStore.items.filter(item => item.food.toppings.length > 0)[0]);
		}
	}

	function updateEnabledItemsForPortion(portion: FoodPortion): void {
		let selectedPortionItems = $OrderStore!.items.filter(i => i.selectedPortionId === portion.id && i.areCouponsUsed);
		let usedCoupons = selectedPortionItems.map(i => i.selectedQuantity * portion.couponValue).reduce((a, b) => a + b, 0);
		const portionCoupons = $CustomerCouponsStore.find(c => c.foodPortionId === portion.id) || {count: 0, foodPortionId: portion.id};
		const leftOverCoupons: number = portionCoupons.count - usedCoupons;
		const unselectedPortionItems = $OrderStore!.items.filter(i => i.selectedPortionId === portion.id && !i.areCouponsUsed);
		const disabledCoupons = unselectedPortionItems.filter(i => i.selectedQuantity * portion.couponValue > leftOverCoupons);
		unselectedPortionItems.forEach(i => $EnabledItemCouponsStore.add(i.id));
		disabledCoupons.forEach(i => $EnabledItemCouponsStore.delete(i.id));
		EnabledItemCouponsStore.update(store => new Set([...store]));
	}

	function isItemEnabledForSelection(item: SelectedFood): boolean {
		if (item.areCouponsUsed)
			return true;
		const portion: FoodPortion = MenuUtils.findPortionById(item);
		const coupon: CouponReward | undefined = $OrderCouponInfoStore!.coupons.find(c => c.foodPortionId === item.selectedPortionId);
		if (!coupon)
			return false;
		return item.selectedQuantity * portion.couponValue <= coupon.count
	}

	function updateOrderCouponInfo(): void {
		let earnedCoupons = 0;
		let redeemedCoupons = 0;
		const couponByFoodPortionId: Map<number, CouponReward> = new Map();
		$CustomerCouponsStore.filter(c => $OrderStore!.items.some(item => item.selectedPortionId === c.foodPortionId))
				.forEach(c => couponByFoodPortionId.set(c.foodPortionId, { ...c }));
		$OrderStore!.items.filter(item => item.areCouponsUsed)
				.forEach(item => {
					const portion = MenuUtils.findPortionById(item);
					redeemedCoupons += item.selectedQuantity * portion.couponValue;
					earnedCoupons += item.selectedQuantity;
					couponByFoodPortionId.get(item.selectedPortionId)!.count -= item.selectedQuantity * portion.couponValue;
				});
		OrderCouponInfoStore.update((store) => {
			if (store) {
				store.earnedCoupons = earnedCoupons;
				store.redeemedCoupons = redeemedCoupons;
				store.coupons = Array.from(couponByFoodPortionId.values());
				return { ...store };
			}
			return store;
		});
	}

	function calculateTotalOrderPrice(): void {
		orderPriceTotal = $OrderStore ? $OrderStore.items.map(MenuUtils.calculateTotalPrice).reduce((a, b) => a + b, 0) : NaN;
	}

	function capitalizeStatus(status: string): string {
		return status.charAt(0).toUpperCase() + status.slice(1);
	}

	function setCurrentItemForToppings(item: SelectedFood): void {
		currentItemForToppings = item;
	}

	async function deleteOrder(): Promise<void> {
		await OrderRepository.delete();
		window.location.href = "/order";
	}

	async function submitOrder(): Promise<void> {
		await OrderRepository.submit();
		window.location.href = "/order";
	}

	async function updateDescription(): Promise<void> {
		OrderStore.update((store) => {
			if (store) {
				store.description = description;
			}
			return store;
		});
		await OrderRepository.update(description);
	}
</script>

<svelte:head>
	<title>Pizza Delicious - Order</title>
</svelte:head>

{#await loadOrder() then _}
	<div class="container mt-100px mb-100px">
		<div class="row justify-content-between">
			<div class="col-8">
				{#if $OrderStore !== null && $OrderStore.items.length > 0}
					{#each $OrderStore.items as item, i}
						<OrderItemCard {item} hasBottomMargin={i < $OrderStore.items.length - 1} updateTotalOrderPrice={calculateTotalOrderPrice} setItemForToppings={setCurrentItemForToppings} {updateOrderCouponInfo} {updateEnabledItemsForPortion}/>
					{/each}
				{:else}
					<p>Order currently empty.</p>
				{/if}
			</div>
			<div class="col-3">
				<div class="sticky-details">
					<div class="card mb-50px">
						<div class="card-body">
							<h5 class="card-title mb-20px fw-bold">Order Details</h5>
							<p class="card-text m-0 d-flex justify-content-between">Order number: <span class="fw-bold">{$OrderStore ? $OrderStore.id : "/"}</span></p>
							<p class="card-text m-0 d-flex justify-content-between">Number of items: <span class="fw-bold">{$OrderStore ? $OrderStore.items.length : "/"}</span></p>
							<p class="card-text m-0 d-flex justify-content-between">Coupons redeemed: <span class="fw-bold">{$OrderCouponInfoStore ? $OrderCouponInfoStore.redeemedCoupons : "/"}</span></p>
							<p class="card-text m-0 d-flex justify-content-between">Coupons earned: <span class="fw-bold">{$OrderCouponInfoStore ? $OrderCouponInfoStore.earnedCoupons : "/"}</span></p>
							<p class="card-text mb-20px d-flex justify-content-between">Total: <span class="fw-bold">{$OrderStore && !isNaN(orderPriceTotal) ? (orderPriceTotal + " ден") : "/"}</span></p>
							<p class="card-text d-flex justify-content-between">Status: <span class="fw-bold">{$OrderStore ? capitalizeStatus($OrderStore.status) : "/"}</span></p>
						</div>
					</div>
					<div class="mb-50px">
						<label for="description" class="form-label">Description</label>
						<textarea class="form-control" id="description" disabled={$OrderStore == null || $OrderStore.status !== "edit"} bind:value={description} on:input={updateDescription}></textarea>
					</div>
					<div>
						<button class="btn red-button w-100 mb-20px" disabled={$OrderStore == null || $OrderStore.status !== "edit"} data-bs-toggle="modal" data-bs-target="#empty-order-modal">Delete Order</button>
						<button class="btn green-button w-100" disabled={$OrderStore == null || $OrderStore.items.length === 0 || $OrderStore.status !== "edit"} data-bs-toggle="modal" data-bs-target="#submit-order-modal">Submit Order</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	{#if currentItemForToppings}
		<EditOrderToppingsModal item={currentItemForToppings} updateTotalOrderPrice={calculateTotalOrderPrice}></EditOrderToppingsModal>
	{/if}
	{#if $OrderStore != null}
		<ConfirmModal title="Delete Order" id="empty-order-modal" onSubmit={deleteOrder}>
			<p slot="content">Are you sure you want to delete the order? All of the data will be lost!</p>
		</ConfirmModal>
	{/if}
	{#if $OrderStore && $OrderStore.items.length > 0 && $OrderStore.status === "edit"}
		<ConfirmModal title="Submit Order" id="submit-order-modal" onSubmit={submitOrder}>
			<p slot="content">Are you sure you want to submit the order? You won’t be able to edit it anymore.</p>
		</ConfirmModal>
	{/if}
{/await}

<style>
	#description {
		resize: none;
		height: 200px;
	}

	.sticky-details {
		position: sticky;
		top: 190px;
	}
</style>
