<script lang="ts">
    import type {Food} from "$lib/domain/models";

    export let food: Food;
    export let averageRating: number | null = null;
</script>

<div class="card">
    <img src={food.imageUrl} class="card-img-top" alt="Image of {food.name}" />
    <div class="card-body text-center">
        <h5 class="card-title">{food.name}</h5>
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
</div>

<style>
    div.card {
        width: 30%;
        padding: 0 !important;
    }
</style>