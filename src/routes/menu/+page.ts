import type {PageLoad} from "./$types";
import {RatingRepository} from "$lib/core/repository/RatingRepository";
import {AuthenticatedCustomerStore} from "$lib/core/stores/AuthenticatedCustomerStore";
import {get} from "svelte/store";
import {CustomerFoodRatingRepository} from "$lib/menu/repository/CustomerFoodRatingRepository";
import {CustomerOrderedFoodsRepository} from "$lib/menu/repository/CustomerOrderedFoodsRepository";
import {FoodRepository} from "$lib/core/repository/FoodRepository";
import {FoodPortionRepository} from "$lib/core/repository/FoodPortionRepository";
import type {FoodPortion} from "$lib/core/domain/models";
import {CategoriesStore} from "$lib/core/stores/CategoriesStore";

export const load: PageLoad = async ({ url }) => {
    const categoryIdQueryParam: string | null = url.searchParams.get('categoryId');
    const categoryId: number | undefined = categoryIdQueryParam && !isNaN(Number(categoryIdQueryParam))
        ? parseInt(categoryIdQueryParam) : undefined;

    const foods = await FoodRepository.get(categoryId);
    const portionsByFoodId = loadPortionsByFoodId();
    const categories = get(CategoriesStore);

    const averageRatingByFoodId = await RatingRepository.getAverageRatingOfEachFood();
    let orderedFoodsIds = new Set<number>();
    let ratingValueByFoodId = new Map<number, number>();
    if (get(AuthenticatedCustomerStore)) {
        orderedFoodsIds = await CustomerOrderedFoodsRepository.getOrderedFoodIds();
        ratingValueByFoodId = await CustomerFoodRatingRepository.getCurrentUserReviews();
    }

    return {
        averageRatingByFoodId,
        orderedFoodsIds,
        ratingValueByFoodId,
        foods,
        portionsByFoodId,
        categories,
        categoryId
    };
};

async function loadPortionsByFoodId(categoryId?: number): Promise<Map<number, FoodPortion[]>> {
    const portionsByFoodId = new Map<number, FoodPortion[]>();
    (await FoodPortionRepository.get(categoryId)).forEach(portion => {
        if (!portionsByFoodId.has(portion.foodId)) {
            portionsByFoodId.set(portion.foodId, []);
        }
        portionsByFoodId.get(portion.foodId)!.push(portion);
    });
    return portionsByFoodId;
}