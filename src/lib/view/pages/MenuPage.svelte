<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import FoodCard from '$lib/view/components/FoodCard.svelte';
	import { MenuFoodsStore } from '$lib/stores/MenuFoodsStore';
	import MenuTabs from '$lib/view/components/MenuTabs.svelte';
	import { StoreOperations } from '$lib/stores/StoreOperations';

	const categoryId: string | null = page.url.searchParams.get('categoryId');

	onMount(async () => {
		await StoreOperations.setMenuFoodsByCategoryId(categoryId ? Number(categoryId) : undefined);
	});
</script>

<svelte:head>
	<title>Pizza Delicious - Menu</title>
</svelte:head>

<div id="showcase">
	<h1>Menu</h1>
</div>
<div class="container">
	<MenuTabs />
	<div class="row">
		{#each $MenuFoodsStore as food}
			<FoodCard {food}></FoodCard>
		{/each}
	</div>
	<hr />
</div>

<style>
	#showcase {
		background: url('/img/menu-showcase.jpg') no-repeat center center/cover;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 100px;
	}

	#showcase h1 {
		color: white;
		font-weight: bold;
		font-size: 3rem;
	}

	.row {
		justify-content: space-between;
	}

	hr {
		margin: 0 0 100px 0 !important;
	}
</style>
