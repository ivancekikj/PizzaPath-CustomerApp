<script lang="ts">
	import Footer from '$lib/view/components/Footer.svelte';
	import Header from '$lib/view/components/Header.svelte';
	import type {Authentication} from "$lib/domain/models";
	import {AuthenticationStore} from "$lib/stores/AuthenticationStore.js";
	import {onMount} from "svelte";
	import {CategoryRepository} from "$lib/repository/CategoryRepository";
	import {CategoriesStore} from "$lib/stores/CategoriesStore";
	import {page} from "$app/state";
	import {AuthenticationUtils} from "$lib/view/utils/AuthenticationUtils";

	let isAuthenticationLoaded: boolean = false;

	function loadAuthentication(): void {
		const value: string | null = localStorage.getItem('authentication');
		const authentication: Authentication | null = value ? (JSON.parse(value) as Authentication) : null;
		if (authentication != null) AuthenticationStore.login(authentication);
	}

	async function loadCategories(): Promise<void> {
		const categories = await CategoryRepository.getAll();
		CategoriesStore.setValue(categories);
	}

	onMount(() => {
		loadAuthentication();
		if ($AuthenticationStore == null && ["/account", "/order"].includes(page.url.pathname)) {
			window.location.href = "/login";
			return;
		}
		if ($AuthenticationStore != null && ["/register", "/login"].includes(page.url.pathname)) {
			AuthenticationUtils.logoutUser();
		}
		loadCategories();
		isAuthenticationLoaded = true;
	})
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/style.css" />
	<link rel="icon" href="/img/logo.svg" />
</svelte:head>

{#if isAuthenticationLoaded}
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
{/if}