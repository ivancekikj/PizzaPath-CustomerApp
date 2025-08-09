<script lang="ts">
	import type { Food } from '$lib/domain/models';
	import {AuthenticatedCustomerStore} from "$lib/stores/AuthenticatedCustomerStore";
	import {OrderedFoodsStore} from "$lib/stores/OrderedFoodsStore";
	import {RatingRepository} from "$lib/repository/RatingRepository";

	export let food: Food;
	export let updateSelectedFoodId: ((foodId: number) => void) | null = null;
	export let userRatingValue: number = -1;

	async function updateRating(value: number): Promise<void> {
		userRatingValue = value;
		await RatingRepository.setRating(food.id, userRatingValue);
	}
	
	async function deleteRating(): Promise<void> {
		userRatingValue = -1;
		await RatingRepository.deleteRating(food.id);
	}
</script>

<div class="card">
	<img src={food.imageUrl} class="card-img-top" alt="Image of {food.name}" />
	<div class="card-body text-center">
		<h5 class="card-title">{food.name}</h5>
		<p class="card-text">{food.description}</p>
	</div>
	<ul class="list-group list-group-flush">
		<li class="list-group-item">Average Rating: /</li>
		{#if $AuthenticatedCustomerStore}
			<li class="list-group-item d-flex justify-content-between align-content-center">
				<span class="d-flex align-items-center">My rating:</span>
				{#if $OrderedFoodsStore.has(food.id)}
					<div class="star-rating d-inline-flex">
						{#each [5, 4, 3, 2, 1] as i}
							<input type="radio" id="star-{food.id}-{i}" name="rating-{food.id}" value="{i}" checked={i === userRatingValue} on:change={async () => await updateRating(i)}>
							<label class="pb-1" for="star-{food.id}-{i}">★</label>
						{/each}
					</div>
					{#if userRatingValue !== -1}
						<div class="d-flex align-items-center">
							<button class="btn red-button" aria-label="Delete" on:click={deleteRating}>
								<i class="fa-solid fa-xmark"></i>
							</button>
						</div>
					{/if}
				{:else}
					<span class="py-3 fw-bold">No rating until ordered.</span>
				{/if}
			</li>
		{/if}
	</ul>
	{#if $AuthenticatedCustomerStore != null && updateSelectedFoodId != null}
		<button class="card-link btn green-button" data-bs-toggle="modal" data-bs-target="#add-to-cart-modal" on:click={() => updateSelectedFoodId(food.id)}>Add to Order</button>
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

	.star-rating {
		direction: rtl;
		font-size: 2rem;
	}

	.star-rating input {
		display: none;
	}

	.star-rating label {
		color: #ccc;
		cursor: pointer;
		transition: color 0.2s;
	}

	.star-rating input:checked ~ label,
	.star-rating label:hover,
	.star-rating label:hover ~ label {
		color: gold;
	}
</style>
