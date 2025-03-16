import { type Writable, writable } from 'svelte/store';
import type { Category } from '$lib/domain/models';

const categories: Writable<Category[]> = writable<Category[]>([]);

export const CategoriesStore = {
	subscribe: categories.subscribe,
	setValue: (collection: Category[]) => categories.set(collection)
};
