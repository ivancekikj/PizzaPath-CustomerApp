import { MenuFoodsStore } from '$lib/stores/MenuFoodsStore';
import { FoodRepository } from '$lib/repository/FoodRepository';
import { CategoryIdStore } from '$lib/stores/CategoryIdStore';
import {FoodPortionsStore} from "$lib/stores/FoodPortionsStore";
import {FoodPortionRepository} from "$lib/repository/FoodPortionRepository";
import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";
import {AuthenticationRepository} from "$lib/repository/AuthenticationRepository";

async function setMenuFoodsByCategoryId(categoryId?: number): Promise<void> {
	MenuFoodsStore.setValue(await FoodRepository.get(categoryId));
	FoodPortionsStore.setValue(await FoodPortionRepository.get(categoryId));
	CategoryIdStore.setValue(categoryId ? categoryId : null);
}

async function logoutUser(): Promise<void> {
	AuthenticatedCustomerStore.set(null);
	await AuthenticationRepository.logout();
}

export const StoreOperations = {
	setMenuFoodsByCategoryId,
	logoutUser
};
