<script lang="ts">
	import type { Food } from '$lib/domain/models';

	export let food: Food;
</script>

<div class="card">
	<img src={food.imageUrl} class="card-img-top" alt="Image of {food.name}" />
	<div class="card-body text-center">
		<h5 class="card-title">{food.name}</h5>
		<p class="card-text">{food.description}</p>
	</div>
	<ul class="list-group list-group-flush">
		<li class="list-group-item">Average Rating: /</li>
	</ul>
	<button class="card-link btn btn-primary red-button">Add to Order</button>
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
