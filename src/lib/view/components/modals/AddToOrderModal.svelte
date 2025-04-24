<script lang="ts">
    import Modal from "$lib/view/components/modals/Modal.svelte";
    import type {SelectedFood} from "$lib/domain/dto";
    import type {Food} from "$lib/domain/models";
    import type {FoodPortion} from "$lib/domain/models.js";
    import {MenuFoodsStore} from "$lib/stores/MenuFoodsStore";
    import {FoodPortionsStore} from "$lib/stores/FoodPortionsStore";
    import {MenuUtils} from "$lib/view/utils/MenuUtils";
    import {OrderRepository} from "$lib/repository/OrderRepository";

    const valuesByFoodId: Map<number, SelectedFood> = new Map<number, SelectedFood>();
    let isButtonClicked: boolean = false;
    let currentData: SelectedFood;
    let total: number = 0;

    export function setCurrentFood(foodId: number): void {
        isButtonClicked = true;
        if (valuesByFoodId.has(foodId)) {
            currentData = valuesByFoodId.get(foodId)!;
            total = MenuUtils.calculateTotalPrice(currentData);
            return;
        }
        const food: Food = $MenuFoodsStore.find(food => food.id === foodId)!;
        const foodPortions: FoodPortion[] = $FoodPortionsStore.filter(portion => portion.foodId === foodId)
            .sort((p1, p2) => p1.price - p2.price);
        const selectedFood: SelectedFood = {
            id: 1,
            food: food,
            portions: foodPortions,
            selectedQuantity: 1,
            selectedPortionId: foodPortions[0].id,
            selectedToppingIds: [],
        };
        valuesByFoodId.set(foodId, selectedFood);
        currentData = selectedFood;
        total = MenuUtils.calculateTotalPrice(currentData);
    }

    async function handleSubmit(): Promise<void> {
        await OrderRepository.addItem(currentData);
        window.location.href = "/order";
    }

    $: {
        if (isButtonClicked) {
            total = MenuUtils.calculateTotalPrice(currentData);
        }
    }

    setCurrentFood($MenuFoodsStore[0].id);
</script>

<Modal title="Add Food to Order">
    <div slot="body">
        <div class="mb-20px">
            <label for="food_name" class="form-label">Food</label>
            <input type="text" class="form-control" name="food_name" id="food_name" disabled value={currentData.food.name} />
        </div>
        <div class="mb-20xp">
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
