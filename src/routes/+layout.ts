import { AuthenticatedCustomerRepository } from '$lib/core/repository/AuthenticatedCustomerRepository'
import type { Customer } from '$lib/core/domain/models'
import { CategoryRepository } from '$lib/core/repository/CategoryRepository'
import type { LayoutLoad } from './$types'
import { CouponRepository } from '$lib/core/repository/CouponRepository'
import axios from 'axios'
import { AuthenticatedCustomerStore } from '$lib/core/stores/AuthenticatedCustomerStore'
import { CustomerCouponsStore } from '$lib/core/stores/CustomerCouponsStore'
import { OrderCouponInfoStore } from '$lib/core/stores/OrderCouponInfoStore'
import { CategoriesStore } from '$lib/core/stores/CategoriesStore'

export const ssr = false
axios.defaults.withCredentials = true

export const load: LayoutLoad = async () => {
	let customer: Customer | null

	try {
		customer = await AuthenticatedCustomerRepository.getCurrent()
	} catch {
		customer = null
	}
	AuthenticatedCustomerStore.set(customer)
	CategoriesStore.setValue(
		(await CategoryRepository.getAll()).sort((a, b) => a.name.localeCompare(b.name))
	)
	if (customer) {
		CustomerCouponsStore.setValue(await CouponRepository.getCurrentUserCoupons())
		OrderCouponInfoStore.setValue(await CouponRepository.getCurrentUserOrderCouponInfo())
	}
}
