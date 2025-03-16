import { type Writable, writable } from 'svelte/store';
import type { Food } from '$lib/domain/models';

const menuFoods: Writable<Food[]> = writable<Food[]>([]);

export const MenuFoodsStore = {
	subscribe: menuFoods.subscribe,
	setValue: (collection: Food[]) => menuFoods.set(collection)
};
