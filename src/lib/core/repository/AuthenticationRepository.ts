import type {CustomerLoginDto} from "$lib/core/domain/dto";
import axios, {AxiosError} from "axios";
import {ApiData} from "$lib/core/repository/ApiData";

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

async function logout(): Promise<void> {
    await axios.post(`${ApiData.ADMIN_APP_URL}/api/accounts/logout/`);
}

export const AuthenticationRepository = {
    login,
    logout
};