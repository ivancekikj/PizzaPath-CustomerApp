import {writable, type Writable} from "svelte/store";
import type {SelectedFood} from "$lib/domain/dto";

const addToCart: Writable<SelectedFood> = writable<SelectedFood>();

export const AddToCartStore = {
    subscribe: addToCart.subscribe,
    setValue: (value: SelectedFood) => addToCart.set(value)
};