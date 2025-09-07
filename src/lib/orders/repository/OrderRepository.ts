import axios, {type AxiosResponse} from "axios";
import {ApiData} from "$lib/core/repository/ApiData";
import {type Food, type FoodPortion, OrderItem, type Size, type Topping} from "$lib/core/domain/models";
import {type Order} from "$lib/orders/domain/models";

async function getCurrentUserOrder(): Promise<Order | null> {
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
            return new OrderItem(
                item.id,
                {
                    id: item.food.id,
                    name: item.food.name,
                    description: item.food.description,
                    imageUrl: item.food.image_url,
                    averageRating: item.food.average_rating,
                    categoryId: item.food.category,
                    toppings: item.food.toppings.map((topping: any) => ({
                        id: topping.id,
                        name: topping.name,
                        price: topping.price
                    } as Topping))
                } as Food,
                item.food_portions.map((portion: any) => ({
                    id: portion.id,
                    price: portion.price,
                    discount: portion.discount,
                    couponValue: portion.coupon_value,
                    size: {
                        id: portion.size.id,
                        name: portion.size.name
                    } as Size,
                    foodId: portion.food_id
                } as FoodPortion)),
                item.food_portion_id,
                item.quantity,
                item.topping_ids,
                item.are_coupons_used
            );
        }),
    } as Order;
}

async function updateItem(item: OrderItem): Promise<void> {
    await axios.put(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/items/${item.id}/`,
        {
            quantity: item.selectedQuantity,
            food_portion_id: item.selectedPortionId,
            toppings_ids: item.selectedToppingIds,
            are_coupons_used: item.areCouponsUsed,
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function updateCurrentUserOrder(description: string): Promise<void> {
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

async function deleteCurrentUserOrder() {
    await axios.delete(
        `${ApiData.ADMIN_APP_URL}/api/orders/current-order/`,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function submitCurrentUserOrder(): Promise<void> {
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
    getCurrentUserOrder,
    updateItem,
    updateCurrentUserOrder,
    deleteItem,
    deleteCurrentUserOrder,
    submitCurrentUserOrder
};