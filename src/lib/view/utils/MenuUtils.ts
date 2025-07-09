import type {SelectedFood} from "$lib/domain/dto";
import type {FoodPortion} from "$lib/domain/models";
import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";
import {get} from "svelte/store";

function calculateTotalPrice(selectedFood: SelectedFood) {
    const portion: FoodPortion = findPortionById(selectedFood);
    const condition = get(AuthenticatedCustomerStore)?.coupons.some(coupon => coupon.foodPortionId === portion.id && coupon.count >= portion.couponValue * selectedFood.selectedQuantity);
    if (selectedFood.areCouponsUsed && condition)
        return 0;
    const toppingsTotal: number = selectedFood.selectedToppingIds
        .map(id => selectedFood.food.toppings.find(topping => topping.id === id)!.price)
        .reduce((prev, curr) => prev + curr, 0);
    let price: number = selectedFood.selectedQuantity * (portion.price + toppingsTotal);
    if (portion.discount > 0) {
        price = price - (price * portion.discount);
    }
    return Math.ceil(price);
}

function findPortionById(selectedFood: SelectedFood): FoodPortion {
    return selectedFood.portions.find(p => p.id === selectedFood.selectedPortionId)!;
}


export const MenuUtils = {
    calculateTotalPrice,
    findPortionById
};