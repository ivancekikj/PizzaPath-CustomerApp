import axios from 'axios';
import { ApiData } from '$lib/repository/ApiData';
import type { Food } from '$lib/model/Food';

async function get(categoryId?: number): Promise<Food[]> {
	const response = await axios.get(
		categoryId
			? `${ApiData.ADMIN_APP_URL}/api/menu/foods/?category_id=${categoryId}`
			: `${ApiData.ADMIN_APP_URL}/api/menu/foods/`
	);
	return response.data.map((food: any) => {
		return {
			id: food.id,
			name: food.name,
			description: food.description,
			imageUrl: food.image_url,
			averageRating: food.average_rating
		} as Food;
	});
}

export const FoodRepository = {
	get
};
