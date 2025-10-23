<script lang="ts">
	import FoodCard from '$lib/menu/view/components/menu-items/FoodCard.svelte'
	import MenuTabs from '$lib/menu/view/components/menu-items/MenuTabs.svelte'
	import AddToOrderModal from '$lib/menu/view/components/order/AddToOrderModal.svelte'
	import { OrderedFoodsStore } from '$lib/menu/stores/OrderedFoodsStore'
	import type { Category, Food, FoodPortion } from '$lib/core/domain/models'

	export let categoryId: number | undefined
	export let categories: Category[]
	export let foods: Food[]
	export let portionsByFoodId: Map<number, FoodPortion[]>
	export let ratingValueByFoodId: Map<number, number>
	export let averageRatingByFoodId: Map<number, number>
	export let orderedFoodIds: Set<number>

	function setUpInitialData(): void {
		const indexByCategory = new Map<number, number>()
		categories.forEach((category, index) => indexByCategory.set(category.id, index))
		foods.sort((f1, f2) => {
			if (f1.categoryId !== f2.categoryId) {
				const f1CategoryIndex = indexByCategory.get(f1.categoryId)!
				const f2CategoryIndex = indexByCategory.get(f2.categoryId)!
				return f1CategoryIndex - f2CategoryIndex
			}
			return f1.name.localeCompare(f2.name)
		})
		OrderedFoodsStore.setValue(orderedFoodIds)
	}

	function getFoodById(): Map<number, Food> {
		const foodById: Map<number, Food> = new Map<number, Food>()
		foods.forEach((food) => foodById.set(food.id, food))
		return foodById
	}

	function getFoodRating(foodId: number): number {
		return ratingValueByFoodId.get(foodId) ?? -1
	}

	function getAverageFoodRating(foodId: number): number | null {
		return averageRatingByFoodId.get(foodId) ?? null
	}

	setUpInitialData()
</script>

<svelte:head>
	<title>Pizza Delicious - Menu</title>
</svelte:head>

<div id="showcase">
	<h1>Menu</h1>
</div>
<div class="container">
	<MenuTabs {categories} {categoryId} />
	<div class="row">
		{#if foods.length > 0}
			<AddToOrderModal {portionsByFoodId} foodById={getFoodById()} />
			{#each foods as food}
				<FoodCard
					{food}
					userRatingValue={getFoodRating(food.id)}
					averageRating={getAverageFoodRating(food.id)}
				></FoodCard>
			{/each}
		{:else}
			<p>No foods available.</p>
		{/if}
	</div>
	<hr />
</div>

<style>
	#showcase {
		background: url('/img/menu/menu-showcase.jpg') no-repeat center center/cover;
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
