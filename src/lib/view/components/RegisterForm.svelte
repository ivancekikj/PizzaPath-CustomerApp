<script lang="ts">
    import type {CustomerRegistrationDto} from "$lib/model/CustomerRegistrationDto";
    import {CustomerRepository} from "$lib/repository/CustomerRepository";
    import {goto} from "$app/navigation";
    import TextInput from "$lib/view/components/TextInput.svelte";
    import {Validators} from "$lib/view/utils/Validators";

    let registration: CustomerRegistrationDto = {} as CustomerRegistrationDto;
    let confirmPassword: string;
    let inputRefs: Promise<Record<string, TextInput | null>> = Promise.resolve({ username: null, email: null, firstName: null, lastName: null, address: null, phoneNumber: null, password: null, confirmPassword: null });

    async function handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        Object.values(await inputRefs).forEach((ref) => ref?.validate());
        const allValid: boolean = Object.values(await inputRefs).every((ref) => ref?.getIsValid());

        if (allValid) {
            await CustomerRepository.create(registration);
            await goto("/");
        }
    }
</script>

<form class="mx-auto mb-100px mt-100px" on:submit={handleSubmit}>
    <h1 class="text-center mb-50px">Register</h1>
    {#await inputRefs then refs}
        <div class="mb-20px">
            <TextInput validator={Validators.get("username")} name="username" label="Username" bind:value={registration.username} required={true} bind:this={refs.username}></TextInput>
        </div>
        <div class="mb-20px">
            <TextInput validator={Validators.get("email")} name="email" label="Email" bind:value={registration.email} required={true} bind:this={refs.email}></TextInput>
        </div>
        <div class="mb-20px">
            <TextInput name="firstName" label="First Name" bind:value={registration.firstName} required={true} bind:this={refs.firstName}></TextInput>
        </div>
        <div class="mb-20px">
            <TextInput name="lastName" label="Last Name" bind:value={registration.lastName} required={true} bind:this={refs.lastName}></TextInput>
        </div>
        <div class="mb-20px">
            <TextInput name="address" label="Address" bind:value={registration.address} required={true} bind:this={refs.address}></TextInput>
        </div>
        <div class="mb-20px">
            <TextInput validator={Validators.get("phoneNumber")} name="phoneNumber" label="Phone Number" bind:value={registration.phoneNumber} required={true} bind:this={refs.phoneNumber}></TextInput>
        </div>
        <div class="mb-20px">
            <TextInput isPassword={true} name="password" label="Password" bind:value={registration.password} required={true} bind:this={refs.password}></TextInput>
        </div>
        <div class="mb-20px">
            <TextInput isPassword={true} name="confirmPassword" label="Confirm Password" bind:value={confirmPassword} required={true} bind:this={refs.confirmPassword}></TextInput>
        </div>
    {/await}
    <div class="mb-50px">
        <label for="newsletter" class="form-label">Subscribe to Newsletter</label>
        <input type="checkbox" class="form-check-input d-block" id="newsletter" bind:checked={registration.isSubscribed}>
    </div>
    <button type="submit" class="btn btn-primary d-inline-block w-100 red-button">Submit</button>
</form>