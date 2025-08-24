<script lang="ts">
    import {FoodRepository} from "$lib/core/repository/FoodRepository";
    import {RatingRepository} from "$lib/core/repository/RatingRepository";
    import type {Food, FoodPortion} from "$lib/core/domain/models";
    import PopularFoodCard from "$lib/core/view/components/PopularFoodCard.svelte";
    import {FoodPortionRepository} from "$lib/core/repository/FoodPortionRepository";
    import {AuthenticatedCustomerStore} from "$lib/core/stores/AuthenticatedCustomerStore";
    import HomePageAddToOrderModal from "$lib/core/view/components/modals/HomePageAddToOrderModal.svelte";
    import {CustomerCouponsStore} from "$lib/core/stores/CustomerCouponsStore";
    import {CouponRepository} from "$lib/core/repository/CouponRepository";
    import {OrderCouponInfoStore} from "$lib/core/stores/OrderCouponInfoStore";

    let foods: Food[] = [];
    let ratingByFoodId: Map<number, number> = new Map<number, number>();
    let portionsByFoodId: Map<number, FoodPortion[]> = new Map<number, FoodPortion[]>();
    let modal: HomePageAddToOrderModal | null = null;

    async function loadData(): Promise<void> {
        foods = await FoodRepository.getMostPopularFoods();
        ratingByFoodId = await RatingRepository.getAverageRatingOfEachFood();
        if (!$AuthenticatedCustomerStore)
            return;
        await loadPortions();
        if ($CustomerCouponsStore.length == 0) {
            CustomerCouponsStore.setValue(await CouponRepository.getCurrentUserCoupons());
        }
        if (!$OrderCouponInfoStore) {
            OrderCouponInfoStore.setValue(await CouponRepository.getCurrentUserOrderCouponInfo());
        }
    }

    function getFoodById(): Map<number, Food> {
        const foodById: Map<number, Food> = new Map<number, Food>();
        foods.forEach(food => foodById.set(food.id, food));
        return foodById;
    }

    async function loadPortions(): Promise<void> {
        const foodIds = new Set(foods.map(food => food.id));
        portionsByFoodId = new Map<number, FoodPortion[]>();
        (await FoodPortionRepository.get())
            .filter(p => foodIds.has(p.foodId))
            .forEach(portion => {
                if (!portionsByFoodId.has(portion.foodId)) {
                    portionsByFoodId.set(portion.foodId, []);
                }
                portionsByFoodId.get(portion.foodId)!.push(portion);
            });
    }

    function getAverageFoodRating(foodId: number): number | null {
        return ratingByFoodId.get(foodId) ?? null;
    }
</script>

{#await loadData() then _}
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
{/await}

<style>
    hr {
        flex-basis: 25%;
    }
</style>