<script>
	import GenericPage from '$lib/view/pages/GenericPage.svelte';
	import RegisterForm from "$lib/view/components/RegisterForm.svelte";
</script>

<GenericPage>
	<title slot="title">Pizza Delicious - Register</title>
	<main slot="content">
		<RegisterForm />
	</main>
</GenericPage>
