export interface CustomerLoginDto {
    username: string;
    password: string;
}

export interface CustomerRegistrationDto {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    password: string;
    isSubscribedToNewsletter: boolean;
}

export interface JwtResponse {
    accessToken: string;
    refreshToken: string;
}