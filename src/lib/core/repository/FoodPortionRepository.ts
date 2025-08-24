import type {FoodPortion} from "$lib/core/domain/models";
import axios from "axios";
import {ApiData} from "$lib/core/repository/ApiData";

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
            couponValue: portion.coupon_value
        } as FoodPortion;
    });
}

export const FoodPortionRepository = {
    get
};
