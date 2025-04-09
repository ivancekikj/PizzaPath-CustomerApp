import type {FoodPortion} from "$lib/domain/models";
import axios from "axios";
import {ApiData} from "$lib/repository/ApiData";

async function get(categoryId?: number): Promise<FoodPortion[]> {
    const response = await axios.get(
        categoryId
        ? `${ApiData.ADMIN_APP_URL}/api/menu/food-portions/?category_id=${categoryId}`
        : `${ApiData.ADMIN_APP_URL}/api/menu/food-portions/`
    );
    return response.data.map((portion: any) => {
        return {
            id: portion.id,
            price: portion.price,
            discount: portion.discount,
            size: {
                id: portion.size.id,
                name: portion.size.name
            },
            foodId: portion.food,
        } as FoodPortion;
    });
}

export const FoodPortionRepository = {
    get
};
