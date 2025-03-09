<script>
	import { CategoriesStore } from '$lib/stores/CategoriesStore';
	import { MenuFoodUtils } from '$lib/utils/MenuFoodsUtils';
	import { CategoryIdStore } from '$lib/stores/CategoryIdStore';
</script>

<ul class="nav nav-tabs">
	<li class="nav-item">
		<a
			class="nav-link {$CategoryIdStore ? undefined : 'active'}"
			href="/menu"
			aria-current={$CategoryIdStore ? undefined : 'page'}
			on:click={async () => await MenuFoodUtils.setMenuFoodsByCategoryId()}>Whole Menu</a
		>
	</li>
	{#each $CategoriesStore as category}
		<li class="nav-item">
			<a
				class="nav-link {$CategoryIdStore === category.id ? 'active' : undefined}"
				aria-current={$CategoryIdStore === category.id ? 'page' : undefined}
				href="/menu?categoryId={category.id}"
				on:click={async () => await MenuFoodUtils.setMenuFoodsByCategoryId(category.id)}
				>{category.name}</a
			>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin-bottom: 50px;
	}
</style>
