import { type Writable, writable } from 'svelte/store';
import type {CouponReward, FoodPortion, OrderCouponInfo} from '$lib/domain/models';

const customerCoupons: Writable<CouponReward[]> = writable<CouponReward[]>([]);

export const CustomerCouponsStore = {
    subscribe: customerCoupons.subscribe,
    setValue: (value: CouponReward[] ) => customerCoupons.set(value)
};
