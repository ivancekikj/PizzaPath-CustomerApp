import {AuthenticationStore} from "$lib/stores/AuthenticationStore";

function logoutUser(): void {
    localStorage.removeItem("authentication");
    AuthenticationStore.logout();
}

export const AuthenticationUtils = {
    logoutUser
};