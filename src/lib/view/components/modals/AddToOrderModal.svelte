<script lang="ts">
    import Modal from "$lib/view/components/modals/Modal.svelte";
    import {AddToCartStore} from "$lib/stores/AddToCartStore";

    async function handleSubmit(): Promise<void> {
        window.location.href = "/order";
    }
</script>

<Modal title="Add Food to Order">
    <div slot="body">
        <div class="mb-20px">
            <label for="food_name" class="form-label">Food</label>
            <input type="text" class="form-control" name="food_name" id="food_name" disabled value={$AddToCartStore.food.name} />
        </div>
        <div class="mb-20xp">
            <label for="size" class="form-label">Size</label>
            <select class="form-select" id="size" bind:value={$AddToCartStore.selectedPortionId}>
                {#each $AddToCartStore.portions as portion}
                    <option value={portion.id}>{portion.size.name} ({portion.price} мкд)</option>
                {/each}
            </select>
        </div>
        <div class="mb-20px">
            <label for="quantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" name="quantity" id="quantity" min="1" bind:value={$AddToCartStore.selectedQuantity} />
        </div>
        {#if $AddToCartStore.food.toppings.length !== 0}
            <div class="mb-20px">
                <div class="form-label">Toppings</div>
                {#each $AddToCartStore.food.toppings as topping}
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="toppings" value={topping.id} id="topping-{topping.name}" bind:group={$AddToCartStore.selectedToppingIds}>
                        <label class="form-check-label" for="topping-{topping.name}">{topping.name} ({topping.price} ден)</label>
                    </div>
                {/each}
            </div>
        {/if}
        <div class="d-flex justify-content-between">
            <div>Discount: <span class="fw-bold">1%</span></div>
            <div>Total: <span class="fw-bold">1</span></div>
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn dark-green-button" data-bs-dismiss="modal">Close</button>
        <button class="btn green-button" data-bs-dismiss="modal" on:click={handleSubmit}>Submit</button>
    </div>
</Modal>
