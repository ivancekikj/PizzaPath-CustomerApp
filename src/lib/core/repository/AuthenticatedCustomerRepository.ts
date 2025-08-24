import { ApiData } from '$lib/core/repository/ApiData';
import axios from 'axios';
import type {Customer} from "$lib/core/domain/models";

async function getCurrent(): Promise<Customer> {
	const response = await axios.get(`${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/`);
	return {
		username: response.data.username,
		email: response.data.email,
		firstName: response.data.first_name,
		lastName: response.data.last_name,
		phoneNumber: response.data.phone_number,
		address: response.data.address,
		password: response.data.password,
		isSubscribedToNewsletter: response.data.is_subscribed_to_newsletter
	} as Customer;
}

async function logout(): Promise<void> {
	await axios.post(`${ApiData.ADMIN_APP_URL}/api/accounts/logout/`);
}

export const AuthenticatedCustomerRepository = {
	getCurrent,
	logout
};
