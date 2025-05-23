<script lang="ts">
    import type {SelectedFood} from "$lib/domain/dto";
    import {MenuUtils} from "$lib/view/utils/MenuUtils";
    import {OrderRepository} from "$lib/repository/OrderRepository";
    import {OrderStore} from "$lib/stores/OrderStore";

    export let item: SelectedFood;
    export let hasBottomMargin: boolean = true;
    export let updateTotalOrderPrice: () => void;
    export let setItemForToppings: (item: SelectedFood) => void;

    async function onItemUpdate(): Promise<void> {
        updateTotalOrderPrice();
        await OrderRepository.updateItem(item);
    }

    async function deleteItem(): Promise<void> {
        OrderStore.update((store) => {
            if (store) {
                store.items = store.items.filter(i => i.id !== item.id);
                return { ...store };
            }
            return null;
        });
        updateTotalOrderPrice();
        await OrderRepository.deleteItem(item.id);
    }

    updateTotalOrderPrice();
</script>

<div class="card {hasBottomMargin ? 'mb-50px' : ''}">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="{item.food.imageUrl}" class="img-fluid rounded-start" alt="Image of {item.food.name}">
        </div>
        <div class="col-md-8 p-2">
            <div class="card-body d-flex flex-column justify-content-between h-100">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold m-0">{item.food.name}</h5>
                    <button class="btn btn-primary red-button rounded-circle" on:click={deleteItem} aria-label="Delete" disabled={$OrderStore && $OrderStore.status !== "edit"}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="row justify-content-between">
                    <div class="{item.food.toppings.length > 0 ? 'col-3' : 'col-5'}">
                        <input type="number" class="form-control" name="quantity" id="quantity" min="1" bind:value={item.selectedQuantity} on:change={onItemUpdate} disabled={$OrderStore && $OrderStore.status !== "edit"} />
                    </div>
                    <div class="{item.food.toppings.length > 0 ? 'col-5' : 'col-7'}">
                        <select class="form-select" id="size" bind:value={item.selectedPortionId} on:change={onItemUpdate} disabled={$OrderStore && $OrderStore.status !== "edit"}>
                            {#each item.portions as portion}
                                <option value={portion.id}>{portion.size.name} ({portion.price} мкд)</option>
                            {/each}
                        </select>
                    </div>
                    {#if item.food.toppings.length > 0}
                        <div class="col-4">
                            <button class="btn btn-primary green-button w-100" data-bs-toggle="modal" data-bs-target="#edit-toppings-modal" on:click={() => setItemForToppings(item)}>Toppings</button>
                        </div>
                    {/if}
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <input type="checkbox" class="form-check-input" id="coupon" disabled={$OrderStore && $OrderStore.status !== "edit"}/>
                        <label for="coupon" class="form-label">Redeem coupons</label>
                    </div>
                    <div>Discount: <span class="fw-bold">{MenuUtils.findPortionById(item).discount * 100}%</span></div>
                    <div>Total: <span class="fw-bold">{MenuUtils.calculateTotalPrice(item)} ден</span></div>
                </div>
            </div>
        </div>
    </div>
</div>