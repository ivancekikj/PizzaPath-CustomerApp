<script lang="ts">
	import { Message } from '$lib/core/domain/models'

	let message: Message | null = null

	const storageValue = localStorage.getItem('message')
	if (storageValue) {
		message = Message.parse(storageValue)
	}

	setTimeout(() => {
		message = null
		localStorage.removeItem('message')
	}, 5000)
</script>

{#if message}
	<div class="alert alert-{message.type} alert- mb-50px text-center" role="alert">
		{message.value}
	</div>
{/if}
