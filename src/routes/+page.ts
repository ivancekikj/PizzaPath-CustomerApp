import type { PageLoad } from './$types'
import { PopularFoodRepository } from '$lib/info-pages/repository/PopularFoodRepository'
import { RatingRepository } from '$lib/core/repository/RatingRepository'
import type { Food, FoodPortion } from '$lib/core/domain/models'
import { FoodPortionRepository } from '$lib/core/repository/FoodPortionRepository'

export const ssr = false

export const load: PageLoad = async () => {
	const foods = await PopularFoodRepository.getMostPopularFoods()
	const ratingByFoodId = await RatingRepository.getAverageRatingOfEachFood()
	const portionsByFoodId = await loadPortionsByFoodId(foods)
	return {
		foods,
		ratingByFoodId,
		portionsByFoodId
	}
}

async function loadPortionsByFoodId(foods: Food[]): Promise<Map<number, FoodPortion[]>> {
	const portionsByFoodId = new Map<number, FoodPortion[]>()
	const foodIds = new Set(foods.map((food) => food.id))
	;(await FoodPortionRepository.get())
		.filter((p) => foodIds.has(p.foodId))
		.forEach((portion) => {
			if (!portionsByFoodId.has(portion.foodId)) {
				portionsByFoodId.set(portion.foodId, [])
			}
			portionsByFoodId.get(portion.foodId)!.push(portion)
		})
	return portionsByFoodId
}
