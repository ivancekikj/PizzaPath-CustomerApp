<script lang="ts">
	import Modal from '$lib/core/view/components/modals/Modal.svelte'
	import { OrderItem } from '$lib/core/domain/models'
	import type { CouponReward, Food } from '$lib/core/domain/models'
	import type { FoodPortion } from '$lib/core/domain/models.js'
	import { OrderCouponInfoStore } from '$lib/core/stores/OrderCouponInfoStore'
	import { CustomerCouponsStore } from '$lib/core/stores/CustomerCouponsStore'
	import { OrderItemRepository } from '$lib/core/repository/OrderItemRepository.js'
	import { ModalStore } from '$lib/menu/stores/ModalStore'

	export let foodById: Map<number, Food>
	export let portionsByFoodId: Map<number, FoodPortion[]>
	const valuesByFoodId: Map<number, OrderItem> = new Map<number, OrderItem>()
	let isButtonClicked: boolean = false
	let currentData: OrderItem
	let total: number = 0
	let areCouponsDisabled: boolean = false

	function setAreCouponsDisabled(): void {
		const portion: FoodPortion = currentData.getSelectedPortion()
		const coupon: CouponReward | undefined = $OrderCouponInfoStore?.coupons.find(
			(c) => c.foodPortionId === portion.id
		)
		if (coupon) {
			areCouponsDisabled = !(coupon.count >= portion.couponValue * currentData.selectedQuantity)
		} else {
			areCouponsDisabled = !$CustomerCouponsStore!.some(
				(coupon) =>
					coupon.foodPortionId === portion.id &&
					coupon.count >= portion.couponValue * currentData.selectedQuantity
			)
		}
		if (areCouponsDisabled && currentData.areCouponsUsed) {
			currentData.areCouponsUsed = false
		}
	}

	function setCurrentFood(foodId: number): void {
		isButtonClicked = true
		if (valuesByFoodId.has(foodId)) {
			currentData = valuesByFoodId.get(foodId)!
			setAreCouponsDisabled()
			total = currentData.calculateTotalPrice()
			return
		}
		const food: Food = foodById.get(foodId)!
		const foodPortions: FoodPortion[] = portionsByFoodId
			.get(foodId)!
			.sort((p1, p2) => p1.price - p2.price)
		const selectedFood: OrderItem = new OrderItem(
			1,
			food,
			foodPortions,
			foodPortions[0].id,
			1,
			[],
			false
		)
		valuesByFoodId.set(foodId, selectedFood)
		currentData = selectedFood
		setAreCouponsDisabled()
		total = currentData.calculateTotalPrice()
	}

	async function handleSubmit(): Promise<void> {
		await OrderItemRepository.addItem(currentData)
		window.location.href = '/order'
	}

	$: {
		if (isButtonClicked) {
			setAreCouponsDisabled()
			total = currentData.calculateTotalPrice()
		}
	}

	setCurrentFood(Number(foodById.keys().next().value))
	ModalStore.setMethodForSettingFood(setCurrentFood)
</script>

<Modal title="Add Food to Order" id="add-to-cart-modal">
	<div slot="body">
		<div class="mb-20px">
			<label for="food_name" class="form-label">Food</label>
			<input
				type="text"
				class="form-control"
				name="food_name"
				id="food_name"
				disabled
				value={currentData.food.name}
			/>
		</div>
		<div class="mb-20px">
			<label for="size" class="form-label">Size</label>
			<select class="form-select" id="size" bind:value={currentData.selectedPortionId}>
				{#each currentData.portions as portion}
					<option value={portion.id}>{portion.size.name} ({portion.price} мкд)</option>
				{/each}
			</select>
		</div>
		<div class="mb-20px">
			<label for="quantity" class="form-label">Quantity</label>
			<input
				type="number"
				class="form-control"
				name="quantity"
				id="quantity"
				min="1"
				bind:value={currentData.selectedQuantity}
			/>
		</div>
		{#if currentData.food.toppings.length !== 0}
			<div class="mb-20px">
				<div class="form-label">Toppings</div>
				{#each currentData.food.toppings as topping}
					<div class="form-check">
						<input
							type="checkbox"
							class="form-check-input"
							name="toppings"
							value={topping.id}
							id="topping-{topping.name}"
							bind:group={currentData.selectedToppingIds}
						/>
						<label class="form-check-label" for="topping-{topping.name}"
							>{topping.name} ({topping.price} ден)</label
						>
					</div>
				{/each}
			</div>
		{/if}
		<div class="mb-20px">
			<label for="coupon" class="form-label">Redeem coupons</label>
			<input
				type="checkbox"
				class="form-check-input d-block"
				id="coupon"
				bind:checked={currentData.areCouponsUsed}
				disabled={areCouponsDisabled}
			/>
		</div>
		<div class="d-flex justify-content-between">
			<div>
				Discount: <span class="fw-bold">{currentData.getSelectedPortion().discount * 100}%</span>
			</div>
			<div>Total: <span class="fw-bold">{total} ден</span></div>
		</div>
	</div>
	<div slot="footer">
		<button type="button" class="btn dark-green-button" data-bs-dismiss="modal">Close</button>
		<button class="btn green-button" data-bs-dismiss="modal" on:click={handleSubmit}>Submit</button>
	</div>
</Modal>
