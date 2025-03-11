<script lang="ts">
    import type {CustomerRegistrationDto} from "$lib/model/CustomerRegistrationDto";
    import {CustomerRepository} from "$lib/repository/CustomerRepository";
    import {goto} from "$app/navigation";

    const registration: CustomerRegistrationDto = {} as CustomerRegistrationDto;
    let confirmPassword: string;

    function isFormValid(): boolean {
        return true;
    }

    async function handleSubmit(): Promise<void> {
        if (!isFormValid())
            return;
        await CustomerRepository.create(registration);
        await goto("/");
    }
</script>

<form class="mx-auto mb-100px mt-100px" on:submit={handleSubmit}>
    <h1 class="text-center mb-50px">Register</h1>
    <div class="mb-20px">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" bind:value={registration.username}>
        <div class="d-none">
            Looks good!
        </div>
    </div>
    <div class="mb-20px">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" bind:value={registration.email}>
    </div>
    <div class="mb-20px">
        <label for="first_name" class="form-label">First Name</label>
        <input type="text" class="form-control" id="first_name" bind:value={registration.firstName}>
    </div>
    <div class="mb-20px">
        <label for="last_name" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="last_name" bind:value={registration.lastName}>
    </div>
    <div class="mb-20px">
        <label for="address" class="form-label">Address</label>
        <input type="text" class="form-control" id="address" bind:value={registration.address}>
    </div>
    <div class="mb-20px">
        <label for="phone_number" class="form-label">Phone Number</label>
        <input type="text" class="form-control" id="phone_number" bind:value={registration.phoneNumber}>
    </div>
    <div class="mb-20px">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" bind:value={registration.password}>
    </div>
    <div class="mb-20px">
        <label for="confirm_password" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirm_password" bind:value={confirmPassword}>
    </div>
    <div class="mb-50px">
        <label for="newsletter" class="form-label">Subscribe to Newsletter</label>
        <input type="checkbox" class="form-check-input d-block" id="newsletter" bind:checked={registration.isSubscribed}>
    </div>
    <button type="submit" class="btn btn-primary d-inline-block w-100 red-button">Submit</button>
</form>