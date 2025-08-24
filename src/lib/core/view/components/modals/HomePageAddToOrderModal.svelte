<script lang="ts">
    import Modal from "$lib/core/view/components/modals/Modal.svelte";
    import type {SelectedFood} from "$lib/core/domain/dto";
    import type {CouponReward, Food} from "$lib/core/domain/models";
    import type {FoodPortion} from "$lib/core/domain/models.js";
    import {MenuUtils} from "$lib/core/view/utils/MenuUtils";
    import {OrderRepository} from "$lib/core/repository/OrderRepository";
    import CheckboxInput from "$lib/core/view/components/CheckboxInput.svelte";
    import {OrderCouponInfoStore} from "$lib/core/stores/OrderCouponInfoStore";
    import {CustomerCouponsStore} from "$lib/core/stores/CustomerCouponsStore";

    export let foodById: Map<number, Food>;
    export let portionsByFoodId: Map<number, FoodPortion[]>;
    const valuesByFoodId: Map<number, SelectedFood> = new Map<number, SelectedFood>();
    let isButtonClicked: boolean = false;
    let currentData: SelectedFood;
    let total: number = 0;
    let areCouponsDisabled: boolean = false;

    function setAreCouponsDisabled(): void {
        const portion: FoodPortion = MenuUtils.findPortionById(currentData);
        const coupon: CouponReward | undefined = $OrderCouponInfoStore?.coupons.find(c => c.foodPortionId === portion.id);
        if (coupon) {
            areCouponsDisabled = !(coupon.count >= portion.couponValue * currentData.selectedQuantity);
        } else {
            areCouponsDisabled = !$CustomerCouponsStore!.some(coupon => coupon.foodPortionId === portion.id && coupon.count >= portion.couponValue * currentData.selectedQuantity);
        }
        if (areCouponsDisabled && currentData.areCouponsUsed) {
            currentData.areCouponsUsed = false;
        }
    }

    export function setCurrentFood(foodId: number): void {
        isButtonClicked = true;
        if (valuesByFoodId.has(foodId)) {
            currentData = valuesByFoodId.get(foodId)!;
            setAreCouponsDisabled();
            total = MenuUtils.calculateTotalPrice(currentData);
            return;
        }
        const food: Food = foodById.get(foodId)!;
        const foodPortions: FoodPortion[] = portionsByFoodId.get(foodId)!
            .sort((p1, p2) => p1.price - p2.price);
        const selectedFood: SelectedFood = {
            id: 1,
            food: food,
            portions: foodPortions,
            selectedQuantity: 1,
            selectedPortionId: foodPortions[0].id,
            selectedToppingIds: [],
            areCouponsUsed: false
        };
        valuesByFoodId.set(foodId, selectedFood);
        currentData = selectedFood;
        setAreCouponsDisabled();
        total = MenuUtils.calculateTotalPrice(currentData);
    }

    async function handleSubmit(): Promise<void> {
        await OrderRepository.addItem(currentData);
        window.location.href = "/order";
    }

    $: {
        if (isButtonClicked) {
            setAreCouponsDisabled();
            total = MenuUtils.calculateTotalPrice(currentData);
        }
    }

    setCurrentFood(Number(foodById.keys().next().value));
</script>

<Modal title="Add Food to Order" id="home-page-add-to-cart-modal">
    <div slot="body">
        <div class="mb-20px">
            <label for="food_name" class="form-label">Food</label>
            <input type="text" class="form-control" name="food_name" id="food_name" disabled value={currentData.food.name} />
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
            <input type="number" class="form-control" name="quantity" id="quantity" min="1" bind:value={currentData.selectedQuantity} />
        </div>
        {#if currentData.food.toppings.length !== 0}
            <div class="mb-20px">
                <div class="form-label">Toppings</div>
                {#each currentData.food.toppings as topping}
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="toppings" value={topping.id} id="topping-{topping.name}" bind:group={currentData.selectedToppingIds}>
                        <label class="form-check-label" for="topping-{topping.name}">{topping.name} ({topping.price} ден)</label>
                    </div>
                {/each}
            </div>
        {/if}
        <div class="mb-20px">
            <CheckboxInput name="coupon" label="Redeem coupons" bind:value={currentData.areCouponsUsed} bind:disabled={areCouponsDisabled}></CheckboxInput>
        </div>
        <div class="d-flex justify-content-between">
            <div>Discount: <span class="fw-bold">{MenuUtils.findPortionById(currentData).discount * 100}%</span></div>
            <div>Total: <span class="fw-bold">{total} ден</span></div>
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn dark-green-button" data-bs-dismiss="modal">Close</button>
        <button class="btn green-button" data-bs-dismiss="modal" on:click={handleSubmit}>Submit</button>
    </div>
</Modal>
