<script>
	import GenericPage from '$lib/view/pages/GenericPage.svelte';
	import LoginForm from "$lib/view/components/LoginForm.svelte";
</script>

<GenericPage>
	<title slot="title">Pizza Delicious - Login</title>
	<main slot="content">
		<LoginForm />
	</main>
</GenericPage>