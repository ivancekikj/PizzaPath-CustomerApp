import type {SelectedFood} from "$lib/domain/dto";
import axios from "axios";
import {ApiData} from "$lib/repository/ApiData";

async function addItem(item: SelectedFood): Promise<void> {
    await axios.post(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/items/`,
        {
            quantity: item.selectedQuantity,
            food_portion_id: item.selectedPortionId,
            toppings_ids: item.selectedToppingIds
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

export const OrderRepository = {
    addItem
};