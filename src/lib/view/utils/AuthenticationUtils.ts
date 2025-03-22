import {AuthenticationStore} from "$lib/stores/AuthenticationStore";

function logoutUser(): void {
    sessionStorage.removeItem("jwt");
    AuthenticationStore.logout();
}

export const AuthenticationUtils = {
    logoutUser
};