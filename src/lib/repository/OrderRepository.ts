import type {SelectedFood} from "$lib/domain/dto";
import axios, {type AxiosResponse} from "axios";
import {ApiData} from "$lib/repository/ApiData";
import type {Food, FoodPortion, Order, Size, Topping} from "$lib/domain/models";

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

async function getCurrentItems(): Promise<Order | null> {
    const response: AxiosResponse<any, any> = await axios.get(`${ApiData.ADMIN_APP_URL}/api/orders/current-order/`);
    if (response.data === "") {
        return null;
    }
    return {
        id: response.data.id,
        dateTimeEdited: response.data.date_time_edited,
        description: response.data.description,
        status: response.data.status,
        items: response.data.items.map((item: any) => {
            return {
                id: item.id,
                selectedQuantity: item.quantity,
                selectedPortionId: item.food_portion_id,
                selectedToppingIds: item.topping_ids,
                food: {
                    id: item.food.id,
                    name: item.food.name,
                    description: item.food.description,
                    imageUrl: item.food.image_url,
                    averageRating: item.food.average_rating,
                    toppings: item.food.toppings.map((topping: any) => ({
                        id: topping.id,
                        name: topping.name,
                        price: topping.price
                    } as Topping))
                } as Food,
                portions: item.food_portions.map((portion: any) => ({
                    id: portion.id,
                    price: portion.price,
                    discount: portion.discount,
                    size: {
                        id: portion.size.id,
                        name: portion.size.name
                    } as Size,
                    foodId: portion.food_id
                } as FoodPortion))
            } as SelectedFood;
        })
    } as Order;
}

async function updateItem(item: SelectedFood): Promise<void> {
    await axios.put(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/items/${item.id}/`,
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

async function update(description: string): Promise<void> {
    await axios.put(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/`,
        {
            description: description
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function deleteItem(id: number): Promise<void> {
    await axios.delete(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/items/${id}/`,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function deleteOrder() {
    await axios.delete(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/`,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function submit(): Promise<void> {
    await axios.put(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/`,
        {
            submitted: true
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

export const OrderRepository = {
    addItem,
    getCurrentItems,
    updateItem,
    update,
    deleteItem,
    delete: deleteOrder,
    submit
};