import type { OrderItem } from '$lib/core/domain/models'
import axios from 'axios'
import { ApiData } from '$lib/core/repository/ApiData'

async function addItem(item: OrderItem): Promise<void> {
	await axios.post(
		`${ApiData.ADMIN_APP_URL}/api/orders/current-order/items/`,
		{
			quantity: item.selectedQuantity,
			food_portion_id: item.selectedPortionId,
			toppings_ids: item.selectedToppingIds,
			are_coupons_used: item.areCouponsUsed
		},
		{
			headers: { 'Content-Type': 'application/json' }
		}
	)
}

export const OrderItemRepository = {
	addItem
}
