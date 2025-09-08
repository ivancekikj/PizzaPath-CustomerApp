import { OrderItem } from '$lib/core/domain/models'

export interface Order {
	id: number
	dateTimeEdited: string
	status: string
	description: string
	items: OrderItem[]
}
