import { MenuFoodsStore } from '$lib/stores/MenuFoodsStore';
import { FoodService } from '$lib/service/FoodService';
import { CategoryIdStore } from '$lib/stores/CategoryIdStore';

async function setMenuFoodsByCategoryId(categoryId?: number): Promise<void> {
	MenuFoodsStore.setValue(await FoodService.getFoods(categoryId));
	CategoryIdStore.setValue(categoryId ? categoryId : null);
}

export const MenuFoodUtils = {
	setMenuFoodsByCategoryId
};
