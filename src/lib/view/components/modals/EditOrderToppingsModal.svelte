<script lang="ts">
    import Modal from "$lib/view/components/modals/Modal.svelte";
    import type {SelectedFood} from "$lib/domain/dto";
    import {OrderRepository} from "$lib/repository/OrderRepository";

    export let item: SelectedFood;
    export let updateTotalOrderPrice: () => void;

    async function onItemUpdate(): Promise<void> {
        updateTotalOrderPrice();
        await OrderRepository.updateItem(item);
    }
</script>

<Modal title="Edit Toppings" id="edit-toppings-modal">
    <div slot="body">
        <div class="mb-20px">
            <label for="food_name" class="form-label">Food</label>
            <input type="text" class="form-control" name="food_name" id="food_name" disabled value={item.food.name} />
        </div>
        <div>
            <div class="form-label">Toppings</div>
            {#each item.food.toppings as topping}
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" name="toppings" value={topping.id} id="topping-{topping.name}" bind:group={item.selectedToppingIds} on:change={onItemUpdate}>
                    <label class="form-check-label" for="topping-{topping.name}">{topping.name} ({topping.price} ден)</label>
                </div>
            {/each}
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn dark-green-button" data-bs-dismiss="modal">Close</button>
    </div>
</Modal>