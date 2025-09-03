<script>
	import MenuPage from '$lib/menu/view/pages/MenuPage.svelte';

    export let data;
</script>

<MenuPage categoryId={data.categoryId} foods={data.foods} portionsByFoodId={data.portionsByFoodId}
          categories={data.categories} ratingValueByFoodId={data.ratingValueByFoodId}
          averageRatingByFoodId={data.averageRatingByFoodId} orderedFoodIds={data.orderedFoodIds} />
