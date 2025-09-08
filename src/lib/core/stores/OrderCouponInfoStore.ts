import { type Writable, writable } from 'svelte/store'
import type { OrderCouponInfo } from '$lib/core/domain/models'

const orderCouponInfo: Writable<OrderCouponInfo | null> = writable<OrderCouponInfo | null>(null)

export const OrderCouponInfoStore = {
	subscribe: orderCouponInfo.subscribe,
	setValue: (value: OrderCouponInfo | null) => orderCouponInfo.set(value),
	update: (updater: (value: OrderCouponInfo | null) => OrderCouponInfo | null) =>
		orderCouponInfo.update(updater)
}
