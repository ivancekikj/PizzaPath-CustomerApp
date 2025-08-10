import axios from "axios";
import {ApiData} from "$lib/repository/ApiData";

async function getCurrentUserReviews(): Promise<Map<number, number>> {
    const response = await axios.get(
        `${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/food-ratings/`
    );
    const result: Map<number, number> = new Map();
    response.data.forEach((rating: any) => {
        result.set(rating.food_id, rating.value);
    });
    return result;
}

async function setRating(foodId: number, value: number): Promise<void> {
    await axios.put(
        `${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/food-ratings/?food_id=${foodId}`,
        {
            value: value
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function deleteRating(foodId: number): Promise<void> {
    await axios.delete(
        `${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/food-ratings/?food_id=${foodId}`,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function getAverageRatingOfFood(foodId: number): Promise<number | null> {
    const response = await axios.get(
        `${ApiData.ADMIN_APP_URL}/api/menu/foods/${foodId}/average-rating/`
    );
    return response.data === "" ? null : response.data;
}

async function getAverageRatingOfEachFood(): Promise<Map<number, number>> {
    const response = await axios.get(
        `${ApiData.ADMIN_APP_URL}/api/menu/foods/average-ratings/`
    );
    const result: Map<number, number> = new Map();
    response.data.forEach((rating: any) => {
        if (rating.avg_value != null) {
            result.set(rating.id, rating.avg_value);
        }
    });
    return result;
}

export const RatingRepository = {
    getCurrentUserReviews,
    setRating,
    deleteRating,
    getAverageRatingOfFood,
    getAverageRatingOfEachFood
};