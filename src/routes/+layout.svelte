<script>
	import Footer from '$lib/view/components/Footer.svelte';
	import Header from '$lib/view/components/Header.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/style.css" />
	<link rel="icon" href="/img/logo.svg" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<Footer />
