import type {Food, FoodPortion} from "$lib/domain/models";

export interface CustomerLoginDto {
    username: string;
    password: string;
}

export interface SelectedFood {
    food: Food;
    portions: FoodPortion[];
    selectedPortionId: number;
    selectedQuantity: number;
    selectedToppingIds: number[];
}