<script lang="ts">
	let message: string | null = localStorage.getItem('message')

	setTimeout(() => {
		message = null
		localStorage.removeItem('message')
	}, 5000)
</script>

{#if message}
	<div class="alert alert-success mb-50px text-center" role="alert">{message}</div>
{/if}
