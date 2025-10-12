<script lang="ts">
	import type { Food } from '$lib/core/domain/models'
	import { AuthenticatedCustomerStore } from '$lib/core/stores/AuthenticatedCustomerStore'
	import { ModalStore } from '$lib/info-pages/stores/ModalStore'

	export let food: Food
	export let averageRating: number | null = null
</script>

<div class="card">
	<img src={food.imageUrl} class="card-img-top" alt="Image of {food.name}" />
	<div class="card-body text-center">
		<h5 class="card-title fw-bold">{food.name}</h5>
		<p class="card-text">{food.description}</p>
	</div>
	<ul class="list-group list-group-flush">
		<li class="list-group-item d-flex justify-content-between align-items-center">
			<span>Average Rating:</span>
			<span class="fw-bold">
				{#if averageRating != null}
					{averageRating} / 5
				{:else}
					/
				{/if}
			</span>
		</li>
	</ul>
	{#if $AuthenticatedCustomerStore}
		<button
			class="card-link btn green-button"
			data-bs-toggle="modal"
			data-bs-target="#home-page-add-to-cart-modal"
			on:click={() => ModalStore.setCurrentFood(food.id)}>Add to Order</button
		>
	{/if}
</div>

<style>
	div.card {
		width: 30%;
		padding: 0 !important;
	}

	.card-link {
		border-radius: 0 0 5px 5px;
	}
</style>
