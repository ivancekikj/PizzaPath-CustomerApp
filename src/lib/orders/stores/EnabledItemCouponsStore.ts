import { type Writable, writable } from 'svelte/store';

const enabledItemCoupons: Writable<Set<number>> = writable<Set<number>>(new Set());

export const EnabledItemCouponsStore = {
    subscribe: enabledItemCoupons.subscribe,
    setValue: (value: Set<number>) => enabledItemCoupons.set(value),
    update: (updater: (value: Set<number>) => Set<number>) => enabledItemCoupons.update(updater)
};
