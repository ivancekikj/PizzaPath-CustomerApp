import { get, writable, type Writable } from 'svelte/store'

const setCurrentFood: Writable<(foodId: number) => void> = writable<(foodId: number) => void>(
	() => {}
)

export const ModalStore = {
	setMethodForSettingFood: (method: (foodId: number) => void) => setCurrentFood.set(method),
	setCurrentFood: (foodId: number) => get(setCurrentFood)(foodId)
}
