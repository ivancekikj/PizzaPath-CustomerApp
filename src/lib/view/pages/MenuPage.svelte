<script lang="ts">
	import { page } from '$app/state';
	import FoodCard from '$lib/view/components/FoodCard.svelte';
	import { MenuFoodsStore } from '$lib/stores/MenuFoodsStore';
	import MenuTabs from '$lib/view/components/MenuTabs.svelte';
	import { StoreOperations } from '$lib/stores/StoreOperations';
	import AddToOrderModal from "$lib/view/components/modals/AddToOrderModal.svelte";
	import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";
	import {CustomerCouponsStore} from "$lib/stores/CustomerCouponsStore";
	import {CouponRepository} from "$lib/repository/CouponRepository";
	import {OrderCouponInfoStore} from "$lib/stores/OrderCouponInfoStore";
	import {OrderedFoodsStore} from "$lib/stores/OrderedFoodsStore";
	import {FoodRepository} from "$lib/repository/FoodRepository";
	import {RatingRepository} from "$lib/repository/RatingRepository";

	const categoryIdQueryParam: string | null = page.url.searchParams.get('categoryId');
	const categoryId: number | undefined = categoryIdQueryParam && !isNaN(Number(categoryIdQueryParam))
			? parseInt(categoryIdQueryParam) : undefined;
	let modal: AddToOrderModal | null = null;
	let ratingValueByFoodId: Map<number, number>;
	let averageRatingByFoodId: Map<number, number>;

	async function loadData(): Promise<void> {
		await StoreOperations.setMenuFoodsByCategoryId(categoryId);
		averageRatingByFoodId = await RatingRepository.getAverageRatingOfEachFood();
		if (!$AuthenticatedCustomerStore)
			return;
		if ($CustomerCouponsStore.length == 0) {
			CustomerCouponsStore.setValue(await CouponRepository.getCurrentUserCoupons());
		}
		if (!$OrderCouponInfoStore) {
			OrderCouponInfoStore.setValue(await CouponRepository.getCurrentUserOrderCouponInfo());
		}
		OrderedFoodsStore.setValue(await FoodRepository.getOrderedFoodIds());
		ratingValueByFoodId = await RatingRepository.getCurrentUserReviews();
	}

	function getFoodRating(foodId: number): number {
		return ratingValueByFoodId.get(foodId) ?? -1;
	}

	function getAverageFoodRating(foodId: number): number | null {
		return averageRatingByFoodId.get(foodId) ?? null;
	}
</script>

<svelte:head>
	<title>Pizza Delicious - Menu</title>
</svelte:head>

<div id="showcase">
	<h1>Menu</h1>
</div>
{#await loadData() then _}
	{#if $AuthenticatedCustomerStore != null}
		<AddToOrderModal bind:this={modal} />
	{/if}
	<div class="container">
		<MenuTabs />
		<div class="row">
			{#if modal != null}
				{#each $MenuFoodsStore as food}
					<FoodCard {food} updateSelectedFoodId={modal.setCurrentFood} userRatingValue={getFoodRating(food.id)} averageRating={getAverageFoodRating(food.id)}></FoodCard>
				{/each}
			{:else}
				{#each $MenuFoodsStore as food}
					<FoodCard {food} averageRating={getAverageFoodRating(food.id)}></FoodCard>
				{/each}
			{/if}
		</div>
		<hr />
	</div>
{/await}

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
