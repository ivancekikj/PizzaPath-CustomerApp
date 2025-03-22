<script lang="ts">
	import Footer from '$lib/view/components/Footer.svelte';
	import Header from '$lib/view/components/Header.svelte';
	import type {Authentication, Jwt} from "$lib/domain/models";
	import {AuthenticationStore} from "$lib/stores/AuthenticationStore.js";
	import {onMount} from "svelte";
	import {CategoryRepository} from "$lib/repository/CategoryRepository";
	import {CategoriesStore} from "$lib/stores/CategoriesStore";
	import {page} from "$app/state";
	import {AuthenticationUtils} from "$lib/view/utils/AuthenticationUtils";
	import {CustomerRepository} from "$lib/repository/CustomerRepository";
	import {JwtRepository} from "$lib/repository/JwtRepository";

	let isAuthenticationLoaded: boolean = false;

	async function loadAuthentication(): Promise<void> {
		const value: string | null = sessionStorage.getItem('jwt');
		const jwt: Jwt | null = value ? (JSON.parse(value) as Jwt) : null;
		if (jwt != null && !isTokenExpired(jwt.accessToken)) {
			const username: string = (await CustomerRepository.getCurrent(jwt.accessToken)).username;
			const authentication: Authentication = {
				jwt: jwt,
				username: username
			};
			AuthenticationStore.login(authentication);
		} else {
			AuthenticationUtils.logoutUser();
		}
	}

	async function loadCategories(): Promise<void> {
		const categories = await CategoryRepository.getAll();
		CategoriesStore.setValue(categories);
	}

	function isTokenExpired(accessToken: string): boolean {
		let tokenExpiry: number;
		try {
			const payloadBase64 = accessToken.split('.')[1];
			const payloadJSON = atob(payloadBase64);
			const payload = JSON.parse(payloadJSON);
			tokenExpiry = payload.exp ?? null;
		} catch (error) {
			return true;
		}
		return tokenExpiry <= Math.floor(Date.now() / 1000);
	}

	function renewTokenValidity(): void {
		if ($AuthenticationStore != null) {
			setInterval(async () => {
				console.log(isTokenExpired($AuthenticationStore.jwt.accessToken));
				if (isTokenExpired($AuthenticationStore.jwt.accessToken)) {
					const renewedJwt: Jwt = await JwtRepository.refresh($AuthenticationStore.jwt.refreshToken);
					sessionStorage.setItem("jwt", JSON.stringify(renewedJwt));
					AuthenticationStore.subscribe(value => {
						if (value != null) {
							value.jwt = renewedJwt;
						}
					});
				}
			}, 1000);
		}
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
		renewTokenValidity();
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