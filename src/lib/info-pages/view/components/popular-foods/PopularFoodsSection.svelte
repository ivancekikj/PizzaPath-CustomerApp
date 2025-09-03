<script lang="ts">
    import type {Food, FoodPortion} from "$lib/core/domain/models";
    import PopularFoodCard from "$lib/info-pages/view/components/popular-foods/PopularFoodCard.svelte";
    import {AuthenticatedCustomerStore} from "$lib/core/stores/AuthenticatedCustomerStore";
    import HomePageAddToOrderModal from "$lib/info-pages/view/components/popular-foods/AddPopularFoodToOrderModal.svelte";

    export let foods: Food[];
    export let ratingByFoodId: Map<number, number>;
    export let portionsByFoodId: Map<number, FoodPortion[]>;
    let modal: HomePageAddToOrderModal | null = null;

    function getFoodById(): Map<number, Food> {
        const foodById: Map<number, Food> = new Map<number, Food>();
        foods.forEach(food => foodById.set(food.id, food));
        return foodById;
    }

    function getAverageFoodRating(foodId: number): number | null {
        return ratingByFoodId.get(foodId) ?? null;
    }
</script>

{#if $AuthenticatedCustomerStore && foods.length > 0}
    <HomePageAddToOrderModal bind:this={modal} {portionsByFoodId} foodById={getFoodById()} />
{/if}
<section class="mb-100px">
    <div class="d-flex align-items-center justify-content-between mb-50px">
        <hr>
        <h2 class="fw-bold text-center">Our Most Ordered Menu Items</h2>
        <hr>
    </div>
    <div class="row justify-content-between">
        {#if foods.length > 0}
            {#each foods as food}
                <PopularFoodCard {food} averageRating={getAverageFoodRating(food.id)} updateSelectedFoodId={modal?.setCurrentFood}></PopularFoodCard>
            {/each}
        {:else}
            <p class="text-center">No orders have been placed.</p>
        {/if}
    </div>
</section>

<style>
    hr {
        flex-basis: 25%;
    }
</style>