import {writable, type Writable} from "svelte/store";
import type {SelectedFood} from "$lib/domain/dto";

const addToCartValues: Writable<Map<number, SelectedFood>> = writable<Map<number, SelectedFood>>(new Map());

export const AddToCartValuesStore = {
    subscribe: addToCartValues.subscribe,
};