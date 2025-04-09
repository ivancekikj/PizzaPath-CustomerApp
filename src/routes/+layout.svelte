<script lang="ts">
	import Footer from '$lib/view/components/Footer.svelte';
	import Header from '$lib/view/components/Header.svelte';
	import type {Customer} from "$lib/domain/models";
	import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";
	import {onMount} from "svelte";
	import {CategoryRepository} from "$lib/repository/CategoryRepository";
	import {CategoriesStore} from "$lib/stores/CategoriesStore";
	import {page} from "$app/state";
	import {AuthenticationUtils} from "$lib/view/utils/AuthenticationUtils";
	import {CustomerRepository} from "$lib/repository/CustomerRepository";
	import axios from "axios";
	import {goto} from "$app/navigation";

	axios.defaults.withCredentials = true;
	let isAuthenticationLoaded: boolean = false;

	async function loadAuthentication(): Promise<void> {
		let customer: Customer;
		try {
			customer = await CustomerRepository.getCurrent();
		} catch (error: any) {
			return;
		}
		AuthenticatedCustomerStore.set(customer);
	}

	async function loadCategories(): Promise<void> {
		const categories = await CategoryRepository.getAll();
		CategoriesStore.setValue(categories);
	}

	onMount(async () => {
		await loadAuthentication();
		if ($AuthenticatedCustomerStore == null && ["/account", "/order"].includes(page.url.pathname)) {
			await goto("/login");
		}
		if ($AuthenticatedCustomerStore != null && ["/register", "/login"].includes(page.url.pathname)) {
			await AuthenticationUtils.logoutUser();
		}
		await loadCategories();
		isAuthenticationLoaded = true;
	});
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