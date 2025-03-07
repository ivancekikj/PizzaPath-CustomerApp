import {FoodRepository} from "$lib/repository/FoodRepository";
import {FoodStore} from "$lib/stores/FoodStore";

async function loadFoods(categoryId?: number): Promise<void> {
    const foods = await FoodRepository.getFoods(categoryId);
    FoodStore.setValue(foods);
}

export const FoodViewModel = {
    loadFoods
};