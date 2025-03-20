<script lang="ts">
	import type { Customer } from '$lib/domain/models';
	import { CustomerRepository } from '$lib/repository/CustomerRepository';
	import { goto } from '$app/navigation';
	import TextInput from '$lib/view/components/TextInput.svelte';
	import { type Validator, Validators } from '$lib/view/utils/Validators';
	import CheckboxInput from '$lib/view/components/CheckboxInput.svelte';
	import { Converters } from '$lib/view/utils/Converters';

	let registration: Customer = {} as Customer;
	let confirmPassword: string;
	let inputRefs: Promise<Record<string, TextInput | null>> = Promise.resolve({
		username: null,
		email: null,
		firstName: null,
		lastName: null,
		address: null,
		phoneNumber: null,
		password: null,
		confirmPassword: null
	});

	const confirmPasswordValidator: Validator = {
		validate: (value) => (registration.password !== value ? 'Both password fields must match!' : '')
	} as Validator;

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();
		const refs: Record<string, TextInput | null> = await inputRefs;

		Object.values(refs).forEach((ref) => ref?.validate());
		const allValid: boolean = Object.values(refs).every((ref) => ref?.getIsValid());

		if (allValid) {
			try {
				await CustomerRepository.create(registration);
			} catch (errorEntries: any) {
				Object.entries(errorEntries).forEach(([key, value]) => {
					refs[Converters.underscoreToCamelcase(key)]?.setExternalErrorMessage(value as string);
				});
				return;
			}
			window.location.href = "/";
		}
	}
</script>

<form class="mx-auto mb-100px mt-100px" on:submit={handleSubmit}>
	<h1 class="text-center mb-50px">Register</h1>
	{#await inputRefs then refs}
		<div class="mb-20px">
			<TextInput
				customValidator={Validators.get('username')}
				name="username"
				label="Username"
				bind:value={registration.username}
				required={true}
				bind:this={refs.username}
			></TextInput>
		</div>
		<div class="mb-20px">
			<TextInput
				customValidator={Validators.get('email')}
				name="email"
				label="Email"
				bind:value={registration.email}
				required={true}
				bind:this={refs.email}
			></TextInput>
		</div>
		<div class="mb-20px">
			<TextInput
				name="firstName"
				label="First Name"
				bind:value={registration.firstName}
				required={true}
				bind:this={refs.firstName}
			></TextInput>
		</div>
		<div class="mb-20px">
			<TextInput
				name="lastName"
				label="Last Name"
				bind:value={registration.lastName}
				required={true}
				bind:this={refs.lastName}
			></TextInput>
		</div>
		<div class="mb-20px">
			<TextInput
				name="address"
				label="Address"
				bind:value={registration.address}
				required={true}
				bind:this={refs.address}
			></TextInput>
		</div>
		<div class="mb-20px">
			<TextInput
				customValidator={Validators.get('phoneNumber')}
				name="phoneNumber"
				label="Phone Number"
				bind:value={registration.phoneNumber}
				required={true}
				bind:this={refs.phoneNumber}
			></TextInput>
		</div>
		<div class="mb-20px">
			<TextInput
				isPassword={true}
				customValidator={Validators.get('password')}
				name="password"
				label="Password"
				bind:value={registration.password}
				required={true}
				bind:this={refs.password}
			></TextInput>
		</div>
		<div class="mb-20px">
			<TextInput
				isPassword={true}
				customValidator={confirmPasswordValidator}
				name="confirmPassword"
				label="Confirm Password"
				bind:value={confirmPassword}
				required={true}
				bind:this={refs.confirmPassword}
			></TextInput>
		</div>
	{/await}
	<div class="mb-50px">
		<CheckboxInput
			name="isSubscribedToNewsletter"
			label="Subscribe to Newsletter"
			bind:value={registration.isSubscribedToNewsletter}
		></CheckboxInput>
	</div>
	<button type="submit" class="btn btn-primary d-inline-block w-100 red-button">Submit</button>
</form>
