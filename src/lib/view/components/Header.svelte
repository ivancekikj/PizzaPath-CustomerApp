<script lang="ts">
	import { onMount } from 'svelte';
	import { CategoriesStore } from '$lib/stores/CategoriesStore';
	import { CategoryRepository } from '$lib/repository/CategoryRepository';
	import { StoreOperations } from '$lib/stores/StoreOperations';
	import type { Authentication } from '$lib/model/Authentication';
	import { AuthenticationStore } from '$lib/stores/AuthenticationStore';

	async function loadCategories(): Promise<void> {
		const categories = await CategoryRepository.getAllCategories();
		CategoriesStore.setValue(categories);
	}

	function loadAuthentication(): void {
		const authentication: Authentication | null = localStorage.getItem(
			'authentication'
		) as Authentication | null;
		if (authentication != null) AuthenticationStore.login(authentication);
	}

	onMount(() => {
		loadAuthentication();
		loadCategories();
	});
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
	<div class="container">
		<a class="navbar-brand" href="/">
			<img id="logo" src="/img/logo.svg" alt="Company logo" />
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNavDropdown"
			aria-controls="navbarNavDropdown"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/about">About</a>
				</li>
				<li class="nav-item dropdown">
					<a
						class="nav-link dropdown-toggle"
						href="/menu"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Menu
					</a>
					<ul class="dropdown-menu">
						<li>
							<a
								class="dropdown-item"
								href="/menu"
								on:click={async () => await StoreOperations.setMenuFoodsByCategoryId()}
								>Whole Menu</a
							>
						</li>
						{#each $CategoriesStore as category}
							<li>
								<a
									class="dropdown-item"
									href="/menu?categoryId={category.id}"
									on:click={async () => await StoreOperations.setMenuFoodsByCategoryId(category.id)}
									>{category.name}</a
								>
							</li>
						{/each}
					</ul>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/order">Order</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/account">Account</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/register">Register</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/login">Login</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	nav {
		background: #1a1a1a !important;
		position: sticky;
		top: 0;
		z-index: 1;
	}

	#logo {
		height: 64px;
	}

	.nav-item.dropdown:hover .dropdown-menu {
		display: block;
	}
</style>
