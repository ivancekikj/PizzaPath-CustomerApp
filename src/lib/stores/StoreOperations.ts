import { MenuFoodsStore } from '$lib/stores/MenuFoodsStore';
import { FoodRepository } from '$lib/repository/FoodRepository';
import { CategoryIdStore } from '$lib/stores/CategoryIdStore';
import {FoodPortionsStore} from "$lib/stores/FoodPortionsStore";
import {FoodPortionRepository} from "$lib/repository/FoodPortionRepository";
import type {Food, FoodPortion, Topping} from "$lib/domain/models";
import {get} from "svelte/store";
import {AddToCartStore} from "$lib/stores/AddToCartStore";
import {AddToCartValuesStore} from "$lib/stores/AddToCartValuesStore";
import type {SelectedFood} from "$lib/domain/dto";

async function setMenuFoodsByCategoryId(categoryId?: number): Promise<void> {
	MenuFoodsStore.setValue(await FoodRepository.get(categoryId));
	FoodPortionsStore.setValue(await FoodPortionRepository.get(categoryId));
	CategoryIdStore.setValue(categoryId ? categoryId : null);
}

function setAddToCartFood(foodId: number) {
	if (get(AddToCartValuesStore).has(foodId)) {
		AddToCartStore.setValue(get(AddToCartValuesStore).get(foodId)!);
		return;
	}
	const food: Food = get(MenuFoodsStore).filter(food => food.id === foodId)[0];
	const foodPortions: FoodPortion[] = get(FoodPortionsStore).filter(portion => portion.foodId === foodId)
		.sort((p1, p2) => p1.price - p2.price);
	const selectedFood: SelectedFood = {
		food: food,
		portions: foodPortions,
		selectedQuantity: 1,
		selectedPortionId: foodPortions[0].id,
		selectedToppingIds: [],
	};
	get(AddToCartValuesStore).set(foodId, selectedFood);
	AddToCartStore.setValue(selectedFood);
}

export const StoreOperations = {
	setMenuFoodsByCategoryId,
	setAddToCartFood
};
