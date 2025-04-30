<script lang="ts">
    import type {SelectedFood} from "$lib/domain/dto";
    import {MenuUtils} from "$lib/view/utils/MenuUtils";
    import {OrderRepository} from "$lib/repository/OrderRepository";

    export let item: SelectedFood;
    export let hasBottomMargin: boolean = true;
    export let updateTotalOrderPrice: () => void;

    async function onItemUpdate(): Promise<void> {
        updateTotalOrderPrice();
        await OrderRepository.updateItem(item);
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
                <div class="d-flex justify-content-between">
                    <h5 class="fw-bold">{item.food.name}</h5>
                    <i class="fa-solid fa-circle-xmark x-icon"></i>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="input-width">
                        <input type="number" class="form-control" name="quantity" id="quantity" min="1" bind:value={item.selectedQuantity} on:change={onItemUpdate} />
                    </div>
                    <div class="input-width">
                        <select class="form-select" id="size" bind:value={item.selectedPortionId} on:change={onItemUpdate}>
                            {#each item.portions as portion}
                                <option value={portion.id}>{portion.size.name} ({portion.price} мкд)</option>
                            {/each}
                        </select>
                    </div>
                    <div class="input-width">
                        <button class="btn btn-primary green-button w-100">Toppings</button>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <input type="checkbox" class="form-check-input" id="coupon"/>
                        <label for="coupon" class="form-label">Redeem coupons</label>
                    </div>
                    <div>Discount: <span class="fw-bold">{MenuUtils.findPortionById(item).discount * 100}%</span></div>
                    <div>Total: <span class="fw-bold">{MenuUtils.calculateTotalPrice(item)} ден</span></div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .x-icon {
        color: #fe0000 !important;
        transform: scale(1.5);
        transform-origin: top right;
    }

    .x-icon:hover {
        color: #8b0000 !important;
        cursor: pointer;
    }

    .input-width {
        width: 30%;
    }
</style>