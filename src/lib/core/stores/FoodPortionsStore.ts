import { type Writable, writable } from 'svelte/store';
import type { FoodPortion} from '$lib/core/domain/models';

const foodPortions: Writable<FoodPortion[]> = writable<FoodPortion[]>([]);

export const FoodPortionsStore = {
    subscribe: foodPortions.subscribe,
    setValue: (collection: FoodPortion[]) => foodPortions.set(collection)
};
