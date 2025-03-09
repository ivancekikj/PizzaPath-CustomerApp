import type { Customer } from '$lib/model/Customer';

export interface Authentication {
	customer: Customer;
	accessToken: string;
	refreshToken: string;
}
