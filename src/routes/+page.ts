import type { PageLoad } from './$types';
import {get} from "svelte/store";
import {AuthenticatedCustomerStore} from "$lib/core/stores/AuthenticatedCustomerStore";
import {PopularFoodRepository} from "$lib/info-pages/repository/PopularFoodRepository";
import {RatingRepository} from "$lib/core/repository/RatingRepository";
import type {Customer, Food, FoodPortion} from "$lib/core/domain/models";
import {FoodPortionRepository} from "$lib/core/repository/FoodPortionRepository";

export const ssr = false;

export const load: PageLoad = async () => {
    const foods = await PopularFoodRepository.getMostPopularFoods();
    const ratingByFoodId = await RatingRepository.getAverageRatingOfEachFood();
    const portionsByFoodId = await loadPortionsByFoodId(foods, get(AuthenticatedCustomerStore));
    return {
        foods,
        ratingByFoodId,
        portionsByFoodId
    }
};

async function loadPortionsByFoodId(foods: Food[], customer: Customer | null): Promise<Map<number, FoodPortion[]>> {
    const portionsByFoodId = new Map<number, FoodPortion[]>();
    if (!customer)
        return portionsByFoodId;
    const foodIds = new Set(foods.map(food => food.id));
    (await FoodPortionRepository.get())
        .filter(p => foodIds.has(p.foodId))
        .forEach(portion => {
            if (!portionsByFoodId.has(portion.foodId)) {
                portionsByFoodId.set(portion.foodId, []);
            }
            portionsByFoodId.get(portion.foodId)!.push(portion);
        });
    return portionsByFoodId;
}