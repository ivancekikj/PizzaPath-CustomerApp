<script lang="ts">
	import GenericPage from '$lib/view/pages/GenericPage.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import FoodCard from '$lib/view/components/FoodCard.svelte';
	import { MenuFoodsStore } from '$lib/stores/MenuFoodsStore';
	import { MenuFoodUtils } from '$lib/utils/MenuFoodsUtils';
	import MenuTabs from '$lib/view/components/MenuTabs.svelte';

	const categoryId: string | null = page.url.searchParams.get('categoryId');

	onMount(async () => {
		await MenuFoodUtils.setMenuFoodsByCategoryId(categoryId ? Number(categoryId) : undefined);
	});
</script>

<GenericPage>
	<title slot="title">Pizza Delicious - Menu</title>
	<main slot="content">
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
	</main>
</GenericPage>

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
		margin-bottom: 50px;
	}

	hr {
		margin-bottom: 100px;
	}
</style>
