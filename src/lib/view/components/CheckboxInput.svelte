<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: boolean = false;
</script>

<label for={name} class="form-label">{label}</label>
<input type="checkbox" class="form-check-input d-block" id={name} bind:checked={value} />
