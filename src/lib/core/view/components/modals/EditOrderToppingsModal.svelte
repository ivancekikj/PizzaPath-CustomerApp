<script lang="ts">
    import Modal from "$lib/core/view/components/modals/Modal.svelte";
    import type {OrderItem} from "$lib/core/domain/models";
    import {OrderRepository} from "$lib/core/repository/OrderRepository";
    import {OrderStore} from "$lib/core/stores/OrderStore";

    export let item: OrderItem;
    export let updateTotalOrderPrice: () => void;

    async function onItemUpdate(): Promise<void> {
        updateTotalOrderPrice();
        OrderStore.update((store) => {
            if (store) {
                const index = store.items.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    store.items[index] = item;
                }
                return {
                    ...store,
                };
            }
            return null;
        });
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
                    <input type="checkbox" class="form-check-input" name="toppings" value={topping.id} id="topping-{topping.name}" bind:group={item.selectedToppingIds} on:change={onItemUpdate} disabled={$OrderStore && $OrderStore.status !== "edit"}>
                    <label class="form-check-label" for="topping-{topping.name}">{topping.name} ({topping.price} ден)</label>
                </div>
            {/each}
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn dark-green-button" data-bs-dismiss="modal">Close</button>
    </div>
</Modal>