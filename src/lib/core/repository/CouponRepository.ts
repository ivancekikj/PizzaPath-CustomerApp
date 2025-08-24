import axios from "axios";
import {ApiData} from "$lib/core/repository/ApiData";
import type {CategoryCoupons, CouponReward, DetailedCoupon, OrderCouponInfo} from "$lib/core/domain/models";

async function getCurrentUserCoupons(): Promise<CouponReward[]> {
    const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/coupons/`);
    return response.data.map((coupon: any) => {
        return {
            foodPortionId: coupon.food_portion_id,
            count: coupon.count
        } as CouponReward;
    });
}

async function getCurrentUserOrderCouponInfo(): Promise<OrderCouponInfo | null> {
    const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/orders/current-order/coupon-info`);
    if (!response.data) {
        return null;
    }
    return {
        earnedCoupons: response.data.earned_coupons,
        redeemedCoupons: response.data.redeemed_coupons,
        coupons: response.data.coupons.map((coupon: any) => {
            return {
                foodPortionId: coupon.food_portion_id,
                count: coupon.count
            } as CouponReward;
        })
    };
}

async function getDetailedCouponInformation(): Promise<Map<number, CategoryCoupons>> {
    const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/coupons/?group_by_category=True`);
    const result = new Map<number, CategoryCoupons>();
    Object.keys(response.data).forEach((categoryId) => {
        const key = parseInt(categoryId);
        const value = response.data[categoryId];
        const categoryCoupons = {
            categoryId: key,
            categoryName: value.name,
            coupons: value.coupons.map((coupon: any) => {
                return {
                    foodPortionId: coupon.food_portion_id,
                    foodName: coupon.food_name,
                    sizeName: coupon.size_name,
                    couponValue: coupon.required_amount_for_one_portion,
                    count: coupon.earned_count
                } as DetailedCoupon;
            })
        } as CategoryCoupons;
        result.set(key, categoryCoupons);
    });
    return result;
}

export const CouponRepository = {
    getCurrentUserCoupons,
    getCurrentUserOrderCouponInfo,
    getDetailedCouponInformation
};