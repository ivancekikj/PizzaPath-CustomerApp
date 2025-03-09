import { get, type Writable, writable } from 'svelte/store';
import type { Authentication } from '$lib/model/Authentication';

const authenticationStore: Writable<Authentication | null> = writable<Authentication | null>(null);

function calculateAccessTokenExpiry(): number | null {
	const authentication: Authentication | null = get(authenticationStore);
	if (authentication == null) return null;
	const token: string = authentication.accessToken;
	try {
		const payloadBase64 = token.split('.')[1];
		const payloadJSON = atob(payloadBase64);
		const payload = JSON.parse(payloadJSON);
		return payload.exp ?? null;
	} catch (error) {
		return null;
	}
}

export const AuthenticationStore = {
	subscribe: authenticationStore.subscribe,
	get: (): Authentication | null => get(authenticationStore),
	login: (value: Authentication): void => authenticationStore.set(value),
	logout: (): void => authenticationStore.set(null),
	getAccessTokenExpiry: (): number | null => calculateAccessTokenExpiry()
};
