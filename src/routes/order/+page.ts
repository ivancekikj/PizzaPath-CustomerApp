import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { get } from 'svelte/store'
import { AuthenticatedCustomerStore } from '$lib/core/stores/AuthenticatedCustomerStore'
import { OrderRepository } from '$lib/orders/repository/OrderRepository'

export const load: PageLoad = async ({ parent }) => {
	await parent()
	if (!get(AuthenticatedCustomerStore)) {
		throw redirect(302, '/login')
	}
	const order = await OrderRepository.getCurrentUserOrder()
	return {
		order
	}
}
