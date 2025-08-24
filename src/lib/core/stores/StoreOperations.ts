import { MenuFoodsStore } from '$lib/core/stores/MenuFoodsStore';
import { FoodRepository } from '$lib/core/repository/FoodRepository';
import { CategoryIdStore } from '$lib/core/stores/CategoryIdStore';
import {FoodPortionsStore} from "$lib/core/stores/FoodPortionsStore";
import {FoodPortionRepository} from "$lib/core/repository/FoodPortionRepository";
import {AuthenticatedCustomerStore} from "$lib/core/stores/AuthenticatedCustomerStore";
import {AuthenticationRepository} from "$lib/core/repository/AuthenticationRepository";
import {OrderedFoodsStore} from "$lib/core/stores/OrderedFoodsStore";
import {OrderCouponInfoStore} from "$lib/core/stores/OrderCouponInfoStore";
import {CustomerCouponsStore} from "$lib/core/stores/CustomerCouponsStore";

async function setMenuFoodsByCategoryId(categoryId?: number): Promise<void> {
	MenuFoodsStore.setValue(await FoodRepository.get(categoryId));
	FoodPortionsStore.setValue(await FoodPortionRepository.get(categoryId));
	CategoryIdStore.setValue(categoryId ? categoryId : null);
}

async function logoutUser(): Promise<void> {
	AuthenticatedCustomerStore.set(null);
	OrderedFoodsStore.setValue(new Set());
	OrderCouponInfoStore.setValue(null);
	CustomerCouponsStore.setValue([]);
	await AuthenticationRepository.logout();
}

export const StoreOperations = {
	setMenuFoodsByCategoryId,
	logoutUser
};
