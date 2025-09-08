import type { Food } from '$lib/core/domain/models'
import axios from 'axios'
import { ApiData } from '$lib/core/repository/ApiData'

async function getMostPopularFoods(): Promise<Food[]> {
	const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/menu/most-popular-foods/?count=3`)
	return response.data.map(
		(food: {
			id: number
			name: string
			description: string
			image_url: string
			average_rating: number
			category: number
			toppings: Array<{ id: number; name: string; price: number }>
		}) => {
			return {
				id: food.id,
				name: food.name,
				description: food.description,
				imageUrl: food.image_url,
				averageRating: food.average_rating,
				toppings: food.toppings.map((topping) => ({
					id: topping.id,
					name: topping.name,
					price: topping.price
				}))
			} as Food
		}
	)
}

export const PopularFoodRepository = {
	getMostPopularFoods
}
