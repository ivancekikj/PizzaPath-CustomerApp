import { ApiData } from '$lib/repository/ApiData';
import axios, { AxiosError } from 'axios';
import type {Customer} from "$lib/domain/models";

async function create(customer: Customer): Promise<void> {
	try {
		await axios.post(
			`${ApiData.ADMIN_APP_URL}/api/accounts/customers/`,
			{
				username: customer.username,
				email: customer.email,
				address: customer.address,
				phone_number: customer.phoneNumber,
				first_name: customer.firstName,
				last_name: customer.lastName,
				is_subscribed_to_newsletter: customer.isSubscribedToNewsletter,
				password: customer.password
			},
			{
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		const err: AxiosError = error as AxiosError;
		throw err.response?.data;
	}
}

async function getCurrent(accessToken: string): Promise<Customer> {
	const response = await axios.get(
		`${ApiData.ADMIN_APP_URL}/api/accounts/customers/`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	return {
		username: response.data.username,
		email: response.data.email,
		firstName: response.data.first_name,
		lastName: response.data.last_name,
		phoneNumber: response.data.phone_number,
		address: response.data.address,
		password: response.data.password,
		isSubscribedToNewsletter: response.data.is_subscribed_to_newsletter,
	} as Customer;
}

export const CustomerRepository = {
	create,
	getCurrent,
};
