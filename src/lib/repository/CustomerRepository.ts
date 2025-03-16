import type { CustomerRegistrationDto } from '$lib/domain/dto';
import { ApiData } from '$lib/repository/ApiData';
import axios, { AxiosError } from 'axios';

async function create(customerDto: CustomerRegistrationDto): Promise<void> {
	try {
		await axios.post(
			`${ApiData.ADMIN_APP_URL}/api/accounts/customers/`,
			{
				username: customerDto.username,
				email: customerDto.email,
				address: customerDto.address,
				phone_number: customerDto.phoneNumber,
				first_name: customerDto.firstName,
				last_name: customerDto.lastName,
				is_subscribed_to_newsletter: customerDto.isSubscribedToNewsletter,
				password: customerDto.password
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

export const CustomerRepository = {
	create
};
