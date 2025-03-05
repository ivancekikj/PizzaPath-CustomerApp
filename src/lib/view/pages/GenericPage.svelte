<script>
	import Header from '$lib/view/components/Header.svelte';
	import Footer from '$lib/view/components/Footer.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/style.css" />
	<link rel="icon" href="/img/logo.svg" />
	<slot name="title"></slot>
</svelte:head>

<Header />
<slot name="content"></slot>
<Footer />
