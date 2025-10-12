import type { PageLoad } from './$types'
import { AuthenticatedCustomerStore } from '$lib/core/stores/AuthenticatedCustomerStore'
import { AuthenticatedCustomerRepository } from '$lib/core/repository/AuthenticatedCustomerRepository'
import { get } from 'svelte/store'

export const load: PageLoad = async ({ parent }) => {
	await parent()
	if (get(AuthenticatedCustomerStore)) {
		await AuthenticatedCustomerRepository.logout()
		AuthenticatedCustomerStore.set(null)
	}
}
