export interface CustomerLoginDto {
    username: string;
    password: string;
}

export interface JwtResponse {
    accessToken: string;
    refreshToken: string;
}