<script lang="ts">
    import {type Validator, Validators} from "$lib/view/utils/Validators";
    import TextInput from "$lib/view/components/TextInput.svelte";
    import CheckboxInput from "$lib/view/components/CheckboxInput.svelte";
    import {CustomerRepository} from "$lib/repository/CustomerRepository";
    import {Converters} from "$lib/view/utils/Converters";
    import type {CustomerUpdateDto} from "$lib/domain/dto";
    import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";

    let model: CustomerUpdateDto = {
        username: $AuthenticatedCustomerStore!.username,
        firstName: $AuthenticatedCustomerStore!.firstName,
        lastName: $AuthenticatedCustomerStore!.lastName,
        address: $AuthenticatedCustomerStore!.address,
        phoneNumber: $AuthenticatedCustomerStore!.phoneNumber,
        isSubscribedToNewsletter: $AuthenticatedCustomerStore!.isSubscribedToNewsletter,
    } as CustomerUpdateDto;
    let inputRefs: Promise<Record<string, TextInput | null>> = Promise.resolve({
        username: null,
        firstName: null,
        lastName: null,
        address: null,
        phoneNumber: null,
    });

    async function handleSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const refs: Record<string, TextInput | null> = await inputRefs;

        Object.values(refs).forEach((ref) => ref?.validate());
        const allValid: boolean = Object.values(refs).every((ref) => ref?.getIsValid());

        if (allValid) {
            try {
                await CustomerRepository.update(model);
            } catch (errorEntries: any) {
                Object.entries(errorEntries).forEach(([key, value]) => {
                    refs[Converters.underscoreToCamelcase(key)]?.setExternalErrorMessage(value as string);
                });
                return;
            }
            location.reload();
        }
    }
</script>

<form class="mx-auto" on:submit={handleSubmit}>
    <h1 class="mb-50px">Account Details</h1>
    {#await inputRefs then refs}
        <div class="row justify-content-between mb-50px">
            <div class="col-6">
                <div class="mb-20px">
                    <TextInput
                            customValidator={Validators.get('username')}
                            name="username"
                            label="Username"
                            bind:value={model.username}
                            required={true}
                            bind:this={refs.username}
                    ></TextInput>
                </div>
                <div class="mb-20px">
                    <TextInput
                            name="firstName"
                            label="First Name"
                            bind:value={model.firstName}
                            required={true}
                            bind:this={refs.firstName}
                    ></TextInput>
                </div>
                <div>
                    <TextInput
                            name="lastName"
                            label="Last Name"
                            bind:value={model.lastName}
                            required={true}
                            bind:this={refs.lastName}
                    ></TextInput>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-20px">
                    <TextInput
                            name="address"
                            label="Address"
                            bind:value={model.address}
                            required={true}
                            bind:this={refs.address}
                    ></TextInput>
                </div>
                <div class="mb-20px">
                    <TextInput
                            customValidator={Validators.get('phoneNumber')}
                            name="phoneNumber"
                            label="Phone Number"
                            bind:value={model.phoneNumber}
                            required={true}
                            bind:this={refs.phoneNumber}
                    ></TextInput>
                </div>
                <div>
                    <CheckboxInput
                            name="isSubscribedToNewsletter"
                            label="Subscribe to Newsletter"
                            bind:value={model.isSubscribedToNewsletter}
                    ></CheckboxInput>
                </div>
            </div>
        </div>
    {/await}
    <button type="submit" class="btn btn-primary d-inline-block px-5 red-button">Submit</button>
</form>

<style>
    form {
        padding: 50px;
        border-radius: 20px;
        border: 2px solid #1a1a1a;
    }
</style>