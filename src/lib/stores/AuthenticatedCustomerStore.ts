import { type Writable, writable } from 'svelte/store';
import type { Customer } from '$lib/domain/models';

const authenticatedCustomerStore: Writable<Customer | null> = writable<Customer | null>(null);

export const AuthenticatedCustomerStore = {
	subscribe: authenticatedCustomerStore.subscribe,
	set: (value: Customer | null): void => authenticatedCustomerStore.set(value),
};
