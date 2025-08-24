import type {OrderItem} from "$lib/core/domain/models";
import type {FoodPortion} from "$lib/core/domain/models";

function calculateTotalPrice(selectedFood: OrderItem) {
    const portion: FoodPortion = findPortionById(selectedFood);
    if (selectedFood.areCouponsUsed)
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

function findPortionById(selectedFood: OrderItem): FoodPortion {
    return selectedFood.portions.find(p => p.id === selectedFood.selectedPortionId)!;
}


export const MenuUtils = {
    calculateTotalPrice,
    findPortionById
};