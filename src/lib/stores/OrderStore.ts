import {writable, type Writable} from "svelte/store";
import type {Order} from "$lib/domain/models";

const order: Writable<Order | null> = writable<Order | null>(null);

export const OrderStore = {
    subscribe: order.subscribe,
    setValue: (value: Order | null) => order.set(value),
    update: (updater: (value: Order | null) => Order | null) => order.update(updater),
};
