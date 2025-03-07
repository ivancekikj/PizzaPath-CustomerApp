<script lang="ts">
	import GenericPage from '$lib/view/pages/GenericPage.svelte';
	import {onMount} from "svelte";
	import {FoodViewModel} from "$lib/view-model/FoodViewModel";
	import { page } from '$app/state';
	import {FoodStore} from "$lib/stores/FoodStore.js";
	import FoodCard from "$lib/view/components/FoodCard.svelte";

	let categoryId: string | null = page.url.searchParams.get("categoryId");

	onMount(() => {
		FoodViewModel.loadFoods(categoryId ? Number(categoryId) : undefined);
	});
</script>

<GenericPage>
	<title slot="title">Pizza Delicious - Menu</title>
	<main slot="content">
		<div id="showcase">
			<h1>Menu</h1>
		</div>
		<div class="container">
			<div class="row">
				{#each $FoodStore as food}
					<FoodCard {food}></FoodCard>
				{/each}
			</div>
		</div>
	</main>
</GenericPage>

<style>
	#showcase {
		background: url("/img/menu-showcase.jpg") no-repeat center center/cover;
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
		margin-bottom: 100px;
	}
</style>