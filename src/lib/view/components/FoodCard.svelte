<script lang="ts">
	import type { Food } from '$lib/domain/models';
	import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";
	import {OrderedFoodsStore} from "$lib/stores/OrderedFoodsStore";

	export let food: Food;
	export let updateSelectedFoodId: ((foodId: number) => void) | null = null;
</script>

<div class="card">
	<img src={food.imageUrl} class="card-img-top" alt="Image of {food.name}" />
	<div class="card-body text-center">
		<h5 class="card-title">{food.name}</h5>
		<p class="card-text">{food.description}</p>
	</div>
	<ul class="list-group list-group-flush">
		<li class="list-group-item">Average Rating: /</li>
		{#if $OrderedFoodsStore.has(food.id)}
			<li class="list-group-item">My rating: /</li>
		{/if}
	</ul>
	{#if $AuthenticatedCustomerStore != null && updateSelectedFoodId != null}
		<button class="card-link btn red-button" data-bs-toggle="modal" data-bs-target="#add-to-cart-modal" on:click={() => updateSelectedFoodId(food.id)}>Add to Order</button>
	{/if}
</div>

<style>
	div.card {
		width: 30%;
		padding: 0 !important;
		margin-bottom: 50px;
	}

	.card-link {
		border-radius: 0 0 5px 5px;
	}
</style>
