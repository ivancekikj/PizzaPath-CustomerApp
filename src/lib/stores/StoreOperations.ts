import { MenuFoodsStore } from '$lib/stores/MenuFoodsStore';
import { FoodRepository } from '$lib/repository/FoodRepository';
import { CategoryIdStore } from '$lib/stores/CategoryIdStore';

async function setMenuFoodsByCategoryId(categoryId?: number): Promise<void> {
	MenuFoodsStore.setValue(await FoodRepository.get(categoryId));
	CategoryIdStore.setValue(categoryId ? categoryId : null);
}

export const StoreOperations = {
	setMenuFoodsByCategoryId
};
