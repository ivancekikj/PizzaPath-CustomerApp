<script lang="ts">
	import {OrderRepository} from "$lib/repository/OrderRepository";
	import type {Order} from "$lib/domain/models";
	import OrderItemCard from "$lib/view/components/OrderItemCard.svelte";
	import {MenuUtils} from "$lib/view/utils/MenuUtils";
	import EditOrderToppingsModal from "$lib/view/components/modals/EditOrderToppingsModal.svelte";

	let order: Order | null = null;
	let orderPriceTotal: number = NaN;

	async function loadOrder(): Promise<void> {
		order = await OrderRepository.getCurrentItems();
	}

	function calculateTotalOrderPrice(): void {
		orderPriceTotal = order ? order.items.map(MenuUtils.calculateTotalPrice).reduce((a, b) => a + b, 0) : NaN;
	}

	function capitalizeStatus(status: string): string {
		return status.charAt(0).toUpperCase() + status.slice(1);
	}
</script>

<svelte:head>
	<title>Pizza Delicious - Order</title>
</svelte:head>

{#await loadOrder() then _}
	<div class="container mt-100px mb-100px">
		<div class="row justify-content-between">
			<div class="col-8">
				{#if order !== null}
					{#each order.items as item, i}
						<OrderItemCard {item} hasBottomMargin={i < order.items.length - 1} updateTotalOrderPrice={calculateTotalOrderPrice} />
					{/each}
				{:else}
					<p>Order currently empty.</p>
				{/if}
			</div>
			<div class="col-3">
				<div class="position-fixed">
					<div class="card mb-50px">
						<div class="card-body">
							<h5 class="card-title mb-20px fw-bold">Order Details</h5>
							<p class="card-text m-0 d-flex justify-content-between">Order number: <span class="fw-bold">{order ? order.id : "/"}</span></p>
							<p class="card-text m-0 d-flex justify-content-between">Number of items: <span class="fw-bold">{order ? order.items.length : "/"}</span></p>
							<p class="card-text m-0 d-flex justify-content-between">Coupons redeemed: <span class="fw-bold">/</span></p>
							<p class="card-text m-0 d-flex justify-content-between">Coupons earned: <span class="fw-bold">/</span></p>
							<p class="card-text mb-20px d-flex justify-content-between">Total: <span class="fw-bold">{order ? (orderPriceTotal + " ден") : "/"}</span></p>
							<p class="card-text d-flex justify-content-between">Status: <span class="fw-bold">{order ? capitalizeStatus(order.status) : "/"}</span></p>
						</div>
					</div>
					<div class="mb-50px">
						<label for="description" class="form-label">Description</label>
						<textarea class="form-control" id="description" disabled={order == null}></textarea>
					</div>
					<div>
						<button class="btn red-button w-100 mb-20px" disabled={order == null}>Empty Order</button>
						<button class="btn green-button w-100" disabled={order == null}>Submit Order</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<EditOrderToppingsModal></EditOrderToppingsModal>
{/await}

<style>
	#description {
		resize: none;
		height: 200px
	}
</style>
