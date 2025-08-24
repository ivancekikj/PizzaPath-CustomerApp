import type {Food} from "$lib/core/domain/models";
import axios from "axios";
import {ApiData} from "$lib/core/repository/ApiData";

async function getMostPopularFoods(): Promise<Food[]> {
    const response = await axios.get(
        `${ApiData.ADMIN_APP_URL}/api/menu/most-popular-foods/?count=3`
    );
    return response.data.map((food: any) => {
        return {
            id: food.id,
            name: food.name,
            description: food.description,
            imageUrl: food.image_url,
            averageRating: food.average_rating,
            toppings: food.toppings.map((topping: any) => ({
                id: topping.id,
                name: topping.name,
                price: topping.price
            }))
        } as Food;
    });
}

export const PopularFoodRepository = {
    getMostPopularFoods
};