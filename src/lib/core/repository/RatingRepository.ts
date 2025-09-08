import axios from 'axios'
import { ApiData } from '$lib/core/repository/ApiData'

async function getAverageRatingOfFood(foodId: number): Promise<number | null> {
	const response = await axios.get(
		`${ApiData.ADMIN_APP_URL}/api/menu/foods/${foodId}/average-rating/`
	)
	return response.data === '' ? null : response.data
}

async function getAverageRatingOfEachFood(): Promise<Map<number, number>> {
	const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/menu/foods/average-ratings/`)
	const result: Map<number, number> = new Map()
	response.data.forEach((rating: { id: number; avg_value: number }) => {
		if (rating.avg_value != null) {
			result.set(rating.id, rating.avg_value)
		}
	})
	return result
}

export const RatingRepository = {
	getAverageRatingOfFood,
	getAverageRatingOfEachFood
}
