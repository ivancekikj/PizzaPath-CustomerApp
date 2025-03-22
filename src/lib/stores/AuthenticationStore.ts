import { type Writable, writable } from 'svelte/store';
import type { Authentication } from '$lib/domain/models';

const authenticationStore: Writable<Authentication | null> = writable<Authentication | null>(null);

export const AuthenticationStore = {
	subscribe: authenticationStore.subscribe,
	login: (value: Authentication): void => authenticationStore.set(value),
	logout: (): void => authenticationStore.set(null),
};
