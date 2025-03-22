import {AuthenticationRepository} from "$lib/repository/AuthenticationRepository";
import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";

async function logoutUser(): Promise<void> {
    AuthenticatedCustomerStore.set(null);
    await AuthenticationRepository.logout();
}

export const AuthenticationUtils = {
    logoutUser
};