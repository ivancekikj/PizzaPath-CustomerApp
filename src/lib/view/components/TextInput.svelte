<script lang="ts">
    import type { Validator } from "$lib/view/utils/Validators";

    export let label: string;
    export let name: string;
    export let value: string = "";
    export let required: boolean = false;
    export let isPassword: boolean = false;
    export let validator: Validator | null = null;

    let message: string = "";
    let isValid: boolean | null = null;

    function validate(): void {
        isValid = false;
        if (required && (value == undefined || value === "")) {
            message = "This field is required!"
            return;
        }
        if (validator != null && !validator?.regex.test(value)) {
            message = validator.message;
            return;
        }
        isValid = true;
        message = "";
    }

    function getIsValid(): boolean {
        return isValid ?? false;
    }

    export { validate, getIsValid }
</script>

<label for="{name}" class="form-label">{label}</label>
<input type="{isPassword ? 'password' : 'text'}" class="form-control {(isValid ?? true) ? '' : 'is-invalid'}" name="{name}" id="{name}" bind:value={value} class:is-invalid={!(isValid ?? true)} on:blur={validate} on:change={validate} on:submit={validate} on:input={validate}>
{#if message && message !== ""}
    <div class="message">{message}</div>
{/if}

<style>
    .message {
        color: #fe0000;
    }
</style>