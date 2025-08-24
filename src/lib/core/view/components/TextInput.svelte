<script lang="ts">
	import { type Validator, Validators } from '$lib/core/view/utils/Validators';

	export let label: string;
	export let name: string;
	export let value: string = '';
	export let required: boolean = false;
	export let isPassword: boolean = false;
	export let customValidator: Validator | null = null;

	let message: string = '';
	let externalErrorMessage: string = '';
	let isValid: boolean | null = null;
	const validators: Validator[] = [];

	((): void => {
		if (required) validators.push(Validators.get('required') as Validator);
		if (customValidator != null) validators.push(customValidator);
	})();

	function validate(): void {
		isValid = false;
		externalErrorMessage = '';
		for (let validator of validators) {
			message = validator.validate(value);
			if (message !== '') {
				return;
			}
		}
		isValid = true;
	}

	function getIsValid(): boolean {
		return isValid ?? false;
	}

	function setExternalErrorMessage(value: string): void {
		externalErrorMessage = value;
	}

	export { validate, getIsValid, setExternalErrorMessage };
</script>

<label for={name} class="form-label">{label}</label>
<input
	type={isPassword ? 'password' : 'text'}
	class="form-control {isValid == null ? '' : isValid ? 'is-valid' : 'is-invalid'}"
	{name}
	id={name}
	bind:value
	class:is-invalid={!(isValid ?? true)}
	on:blur={validate}
	on:change={validate}
	on:submit={validate}
	on:input={validate}
/>
{#if message && message !== ''}
	<div class="message">{message}</div>
{/if}
{#if externalErrorMessage && externalErrorMessage !== ''}
	<div class="message">{externalErrorMessage}</div>
{/if}

<style>
	.message {
		color: #fe0000;
	}
</style>
