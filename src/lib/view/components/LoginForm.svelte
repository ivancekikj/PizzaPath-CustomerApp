<script lang="ts">
	import TextInput from "$lib/view/components/TextInput.svelte";
	import type {CustomerLoginDto} from "$lib/domain/dto";
	import {AuthenticationRepository} from "$lib/repository/AuthenticationRepository";
	import {goto} from "$app/navigation";
	import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";
	import {CustomerRepository} from "$lib/repository/CustomerRepository";

	const loginData: CustomerLoginDto = {} as CustomerLoginDto;
	const inputRefs: Promise<Record<string, TextInput | null>> = Promise.resolve({
		username: null,
		password: null
	});
	let errorMessage: string = "";

	async function loginUser(): Promise<void> {
		try {
			await AuthenticationRepository.login(loginData);
		} catch (error: any) {
			errorMessage = error.detail;
			setTimeout(() => errorMessage = "", 3000);
			return;
		}
		AuthenticatedCustomerStore.set(await CustomerRepository.getCurrent());
		await goto("/");
	}

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();
		const refs: Record<string, TextInput | null> = await inputRefs;

		Object.values(refs).forEach((ref) => ref?.validate());
		const allValid: boolean = Object.values(refs).every((ref) => ref?.getIsValid());
		if (!allValid) {
			return;
		}

		await loginUser();
	}
</script>

<form class="mx-auto mb-100px mt-100px" on:submit={handleSubmit}>
	<h1 class="text-center mb-50px">Login</h1>
	{#await inputRefs then refs}
		{#if errorMessage && errorMessage !== ''}
			<div class="message mb-20px">{errorMessage}</div>
		{/if}
		<div class="mb-20px">
			<TextInput
					name="username"
					label="Username"
					bind:value={loginData.username}
					required={true}
					bind:this={refs.username}
			></TextInput>
		</div>
		<div class="mb-50px">
			<TextInput
					isPassword={true}
					name="password"
					label="Password"
					bind:value={loginData.password}
					required={true}
					bind:this={refs.password}
			></TextInput>
		</div>
	{/await}
	<button type="submit" class="btn btn-primary d-inline-block w-100 red-button">Submit</button>
</form>

<style>
	.message {
		color: #fe0000;
	}
</style>
