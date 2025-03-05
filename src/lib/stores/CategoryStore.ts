import { writable } from 'svelte/store';
import type { Category } from '$lib/model/Category';

const categories = writable<Category[]>([]);

export const CategoryStore = {
	subscribe: categories.subscribe,
	setValue: (collection: Category[]) => categories.set(collection)
};
