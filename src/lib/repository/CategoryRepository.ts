import ApiData from './ApiData';
import axios from 'axios';
import type { Category } from '$lib/model/Category';

async function getAllCategories(): Promise<Category[]> {
	const response = await axios.get(`${ApiData.get('ADMIN_APP_URL')}/api/menu/categories/`);
	return response.data.map((category: any) => {
		return { name: category.name, id: category.id } as Category;
	});
}

export const CategoryRepository = {
	getAllCategories
};
