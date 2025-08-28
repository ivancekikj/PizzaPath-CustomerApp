<script lang="ts">
	import { CategoriesStore } from '$lib/core/stores/CategoriesStore';
	import { CategoryIdStore } from '$lib/core/stores/CategoryIdStore';
	import { StoreOperations } from '$lib/core/stores/StoreOperations';
</script>

<ul class="nav nav-tabs">
	<li class="nav-item">
		<a
			class="nav-link {$CategoryIdStore ? undefined : 'active'}"
			href="/menu"
			aria-current={$CategoryIdStore ? undefined : 'page'}
			on:click={async () => await StoreOperations.setMenuFoodsByCategoryId()}>Whole Menu</a
		>
	</li>
	{#each $CategoriesStore as category}
		<li class="nav-item">
			<a
				class="nav-link {$CategoryIdStore === category.id ? 'active' : undefined}"
				aria-current={$CategoryIdStore === category.id ? 'page' : undefined}
				href="/menu?categoryId={category.id}"
				on:click={async () => await StoreOperations.setMenuFoodsByCategoryId(category.id)}
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
