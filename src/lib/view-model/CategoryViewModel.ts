import { CategoryRepository } from '$lib/repository/CategoryRepository';
import { CategoryStore } from '$lib/stores/CategoryStore';

async function loadCategories() {
	const categories = await CategoryRepository.getAllCategories();
	CategoryStore.setValue(categories);
}

export const CategoryViewModel = {
	loadCategories
};
