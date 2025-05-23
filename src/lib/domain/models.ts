import type {SelectedFood} from "$lib/domain/dto";

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
    toppings: Topping[];
}

export interface Topping {
    id: number;
    name: string;
    price: number;
}

export interface Size {
    id: number;
    name: string;
}

export interface FoodPortion {
    id: number;
    price: number;
    discount: number;
    size: Size;
    foodId: number;
}

export interface Order {
    id: number;
    dateTimeEdited: string;
    status: string;
    description: string;
    items: SelectedFood[];
}