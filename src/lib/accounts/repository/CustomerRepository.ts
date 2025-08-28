import type {Customer} from "$lib/core/domain/models";
import axios, {AxiosError} from "axios";
import {ApiData} from "$lib/core/repository/ApiData";
import type {CustomerLoginDto, CustomerUpdateDto} from "$lib/accounts/domain/dto";

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

async function update(dto: CustomerUpdateDto): Promise<void> {
    try {
        await axios.put(
            `${ApiData.ADMIN_APP_URL}/api/accounts/customers/logged-in-customer/`,
            {
                username: dto.username,
                first_name: dto.firstName,
                last_name: dto.lastName,
                address: dto.address,
                phone_number: dto.phoneNumber,
                is_subscribed_to_newsletter: dto.isSubscribedToNewsletter
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

async function login(loginDto: CustomerLoginDto): Promise<void> {
    try {
        await axios.post(
            `${ApiData.ADMIN_APP_URL}/api/accounts/login/`,
            {
                "username": loginDto.username,
                "password": loginDto.password
            },
            {
                headers: {'Content-Type': 'application/json'}
            }
        );
    } catch (error) {
        const err: AxiosError = error as AxiosError;
        throw err.response?.data;
    }
}

export const CustomerRepository = {
    create,
    update,
    login
};