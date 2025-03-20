export interface Authentication {
    customerUsername: string;
    accessToken: string;
    refreshToken: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Customer {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    password: string;
    isSubscribedToNewsletter: boolean;
}

export interface Food {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    averageRating: number;
}

export interface Topping {
    id: number;
    name: string;
    price: number;
}
