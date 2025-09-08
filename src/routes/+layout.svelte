<script lang="ts">
	import Footer from '$lib/core/view/components/base-structure/Footer.svelte'
	import Header from '$lib/core/view/components/base-structure/Header.svelte'

	setTimeout(() => {
		const elementTypes = [
			document.querySelectorAll('nav.navbar'),
			document.querySelectorAll('main'),
			document.querySelectorAll('footer')
		]

		elementTypes.forEach((type) => {
			if (type.length > 1) for (let i = 0; i < type.length - 1; i++) type[i].remove()
		})
	}, 1)
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/style.css" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<Footer />
