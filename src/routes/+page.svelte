<script>
	import HomePage from '$lib/info-pages/view/pages/HomePage.svelte'

	export let data
</script>

<HomePage
	foods={data.foods}
	ratingByFoodId={data.ratingByFoodId}
	portionsByFoodId={data.portionsByFoodId}
/>
