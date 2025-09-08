import axios from 'axios'
import type { Category } from '$lib/core/domain/models'
import { ApiData } from '$lib/core/repository/ApiData'

async function getAll(): Promise<Category[]> {
	const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/menu/categories/`)
	return response.data.map((category: { id: number; name: string }) => {
		return { name: category.name, id: category.id } as Category
	})
}

export const CategoryRepository = {
	getAll
}
