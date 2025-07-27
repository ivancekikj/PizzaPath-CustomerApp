<script lang="ts">
    import type {CategoryCoupons} from "$lib/domain/models";

    export let categoryCoupons: CategoryCoupons[];
</script>

{#if categoryCoupons.length === 0}
    <p>No earned coupons so far.</p>
{:else}
    <div class="accordion" id="categoryAccordion">
        {#each categoryCoupons as category, i}
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading{i+1}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{i+1}" aria-expanded="false" aria-controls="collapse{i+1}">
                        {category.categoryName}
                    </button>
                </h2>
                <div id="collapse{i+1}" class="accordion-collapse collapse" aria-labelledby="heading{i+1}" data-bs-parent="#categoryAccordion">
                    <div>
                        {#each category.coupons as coupon}
                            <div class="accordion-item p-3 rounded-0">
                                <h6 class="fw-bold">{coupon.foodName} {coupon.sizeName}</h6>
                                <p class="p-0 m-0">Earned: <strong>{coupon.count}</strong></p>
                                <p class="p-0 m-0">Required per portion: <strong>{coupon.couponValue}</strong></p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .accordion-button::after {
        transform: rotate(90deg);
    }
    .accordion-button.collapsed::after {
        transform: rotate(0deg);
    }
</style>