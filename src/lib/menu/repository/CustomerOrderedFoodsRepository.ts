import axios from "axios";
import {ApiData} from "$lib/core/repository/ApiData";

async function getOrderedFoodIds(): Promise<Set<number>> {
    const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/ordered-foods/ids/`);
    return new Set(response.data);
}

export const CustomerOrderedFoodsRepository = {
    getOrderedFoodIds
};