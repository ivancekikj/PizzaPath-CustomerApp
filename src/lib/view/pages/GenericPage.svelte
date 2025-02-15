<script>
	import Header from '$lib/view/components/Header.svelte';
	import Footer from '$lib/view/components/Footer.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/style.css" />
</svelte:head>

<Header />
<slot></slot>
<Footer />
