import {writable, type Writable} from "svelte/store";

const orderedFoods: Writable<Set<number>> = writable<Set<number>>(new Set());

export const OrderedFoodsStore = {
    subscribe: orderedFoods.subscribe,
    setValue: (value: Set<number>) => orderedFoods.set(value),
};
