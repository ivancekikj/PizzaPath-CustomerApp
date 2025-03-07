import { writable } from 'svelte/store';
import type {Food} from "$lib/model/Food";

const foods = writable<Food[]>([]);

export const FoodStore = {
    subscribe: foods.subscribe,
    setValue: (collection: Food[]) => foods.set(collection)
};
