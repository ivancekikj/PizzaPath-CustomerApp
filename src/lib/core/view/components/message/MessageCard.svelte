<script lang="ts">
	let message: string | null
	let messageType: string = 'success'

	message = localStorage.getItem('success')
	if (!message) {
		message = localStorage.getItem('error')
		messageType = 'danger'
	}

	setTimeout(() => {
		message = null
		localStorage.removeItem(messageType)
	}, 5000)
</script>

{#if message}
	<div class="alert alert-{messageType} alert- mb-50px text-center" role="alert">
		{message}
	</div>
{/if}
