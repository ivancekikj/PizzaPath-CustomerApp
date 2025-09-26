<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'bootstrap/dist/js/bootstrap.bundle.min.js'
	import '@fortawesome/fontawesome-free/css/all.min.css'
	import '@fortawesome/fontawesome-free/js/all.min.js'
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
