import type {SelectedFood} from "$lib/domain/dto";
import type {FoodPortion} from "$lib/domain/models";

function calculateTotalPrice(selectedFood: SelectedFood) {
    const toppingsTotal: number = selectedFood.selectedToppingIds
        .map(id => selectedFood.food.toppings.find(topping => topping.id === id)!.price)
        .reduce((prev, curr) => prev + curr, 0);
    const portion: FoodPortion = findPortionById(selectedFood);
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