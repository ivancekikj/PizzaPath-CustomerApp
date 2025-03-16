export interface Authentication {
    customer: Customer;
    accessToken: string;
    refreshToken: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Customer {
    username: string;
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
