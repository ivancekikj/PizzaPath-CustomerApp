import type { CategoryCoupons, DetailedCoupon } from '$lib/accounts/domain/models'
import axios from 'axios'
import { ApiData } from '$lib/core/repository/ApiData'

async function getDetailedCurrentUserCouponInformation(): Promise<Map<number, CategoryCoupons>> {
	const response = await axios.get(
		`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/coupons/?group_by_category=True`
	)
	const result = new Map<number, CategoryCoupons>()
	Object.keys(response.data).forEach((categoryId) => {
		const key = parseInt(categoryId)
		const value = response.data[categoryId]
		const categoryCoupons = {
			categoryId: key,
			categoryName: value.name,
			coupons: value.coupons.map(
				(coupon: {
					food_portion_id: number
					food_name: string
					size_name: string
					required_amount_for_one_portion: number
					earned_count: number
				}) => {
					return {
						foodPortionId: coupon.food_portion_id,
						foodName: coupon.food_name,
						sizeName: coupon.size_name,
						couponValue: coupon.required_amount_for_one_portion,
						count: coupon.earned_count
					} as DetailedCoupon
				}
			)
		} as CategoryCoupons
		result.set(key, categoryCoupons)
	})
	return result
}

export const CouponRepository = {
	getDetailedCurrentUserCouponInformation
}
