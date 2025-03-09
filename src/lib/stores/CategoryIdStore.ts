import { type Writable, writable } from 'svelte/store';
import type { Food } from '$lib/model/Food';

const categoryId: Writable<number | null> = writable<number | null>(null);

export const CategoryIdStore = {
	subscribe: categoryId.subscribe,
	setValue: (value: number | null) => categoryId.set(value)
};
