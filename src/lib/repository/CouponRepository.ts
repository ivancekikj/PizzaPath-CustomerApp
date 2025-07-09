import axios from "axios";
import {ApiData} from "$lib/repository/ApiData";
import type {CouponReward, OrderCouponInfo} from "$lib/domain/models";

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

export const CouponRepository = {
    getCurrentUserCoupons,
    getCurrentUserOrderCouponInfo
};