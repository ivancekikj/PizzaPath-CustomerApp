import type {CustomerLoginDto} from "$lib/model/CustomerLoginDto";
import axios, {AxiosError, type AxiosResponse} from "axios";
import {ApiData} from "$lib/repository/ApiData";
import type {JwtResponse} from "$lib/model/JwtResponse";

async function login(loginDto: CustomerLoginDto): Promise<JwtResponse> {
    let response: AxiosResponse<any, any>;
    try {
        response = await axios.post(
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
    return {
        accessToken: response.data.access,
        refreshToken: response.data.refresh
    } as JwtResponse;
}

export const JwtRepository = {
    login
};