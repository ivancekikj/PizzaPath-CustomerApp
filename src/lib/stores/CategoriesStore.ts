import { type Writable, writable } from 'svelte/store';
import type { Category } from '$lib/model/Category';

const categories: Writable<Category[]> = writable<Category[]>([]);

export const CategoriesStore = {
	subscribe: categories.subscribe,
	setValue: (collection: Category[]) => categories.set(collection)
};
