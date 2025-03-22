import type {CustomerLoginDto} from "$lib/domain/dto";
import axios, {AxiosError, type AxiosResponse} from "axios";
import {ApiData} from "$lib/repository/ApiData";
import type {Authentication, Jwt} from "$lib/domain/models";

async function create(loginDto: CustomerLoginDto): Promise<Jwt> {
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
    } as Jwt;
}

async function refresh(refreshToken: string): Promise<Jwt> {
    const response: AxiosResponse<any, any> = await axios.post(
        `${ApiData.ADMIN_APP_URL}/api/accounts/tokens/refresh/`,
        {
            "refresh": refreshToken,
        },
        {
            headers: {'Content-Type': 'application/json'}
        }
    );
    return {
        accessToken: response.data.access,
        refreshToken: response.data.refresh
    } as Jwt;
}

export const JwtRepository = {
    create,
    refresh
};