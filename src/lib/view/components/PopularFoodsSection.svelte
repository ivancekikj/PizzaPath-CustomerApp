<script lang="ts">
    import {FoodRepository} from "$lib/repository/FoodRepository";
    import {RatingRepository} from "$lib/repository/RatingRepository";
    import type {Food} from "$lib/domain/models";
    import PopularFoodCard from "$lib/view/components/PopularFoodCard.svelte";

    let foods: Food[] = [];
    let ratingByFoodId: Map<number, number> = new Map<number, number>();

    async function loadData(): Promise<void> {
        foods = await FoodRepository.getMostPopularFoods();
        ratingByFoodId = await RatingRepository.getAverageRatingOfEachFood();
    }

    function getAverageFoodRating(foodId: number): number | null {
        return ratingByFoodId.get(foodId) ?? null;
    }
</script>

<section class="mb-100px">
    <div class="d-flex align-items-center justify-content-between mb-50px">
        <hr>
        <h2 class="fw-bold text-center">Our Most Ordered Menu Items</h2>
        <hr>
    </div>
    <div class="row justify-content-between">
        {#await loadData() then _}
            {#if foods.length > 0}
                {#each foods as food}
                    <PopularFoodCard {food} averageRating={getAverageFoodRating(food.id)}></PopularFoodCard>
                {/each}
            {:else}
                <p class="text-center">No orders have been placed.</p>
            {/if}
        {/await}
    </div>
</section>

<style>
    hr {
        flex-basis: 25%;
    }
</style>