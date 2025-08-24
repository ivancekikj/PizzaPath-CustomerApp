<script lang="ts">
	import Footer from '$lib/core/view/components/Footer.svelte';
	import Header from '$lib/core/view/components/Header.svelte';
	import type {Customer} from "$lib/core/domain/models";
	import {AuthenticatedCustomerStore} from "$lib/core/stores/AuthenticatedCustomerStore";
	import {onMount} from "svelte";
	import {CategoryRepository} from "$lib/core/repository/CategoryRepository";
	import {CategoriesStore} from "$lib/core/stores/CategoriesStore";
	import {page} from "$app/state";
	import {CustomerRepository} from "$lib/core/repository/CustomerRepository";
	import axios from "axios";
	import {goto} from "$app/navigation";
	import {StoreOperations} from "$lib/core/stores/StoreOperations";

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
			await StoreOperations.logoutUser();
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