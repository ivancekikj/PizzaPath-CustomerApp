import axios from 'axios'
import { ApiData } from '$lib/core/repository/ApiData'

async function getCurrentUserReviews(): Promise<Map<number, number>> {
	const response = await axios.get(
		`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/food-ratings/`
	)
	const result: Map<number, number> = new Map()
	response.data.forEach((rating: { food_id: number; value: number }) => {
		result.set(rating.food_id, rating.value)
	})
	return result
}

async function setCurrentCustomerRating(foodId: number, value: number): Promise<void> {
	await axios.put(
		`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/food-ratings/?food_id=${foodId}`,
		{
			value: value
		},
		{
			headers: { 'Content-Type': 'application/json' }
		}
	)
}

async function deleteCurrentCustomerRating(foodId: number): Promise<void> {
	await axios.delete(
		`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/food-ratings/?food_id=${foodId}`,
		{
			headers: { 'Content-Type': 'application/json' }
		}
	)
}

export const CustomerFoodRatingRepository = {
	getCurrentUserReviews,
	setCurrentCustomerRating,
	deleteCurrentCustomerRating
}
