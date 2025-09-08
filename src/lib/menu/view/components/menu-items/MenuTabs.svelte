<script lang="ts">
	import type { Category } from '$lib/core/domain/models'

	export let categories: Category[]
	export let categoryId: number | undefined
</script>

<ul class="nav nav-tabs">
	<li class="nav-item">
		<a
			class="nav-link {categoryId ? undefined : 'active'}"
			href="/menu"
			aria-current={categoryId ? undefined : 'page'}>Whole Menu</a
		>
	</li>
	{#each categories as category}
		<li class="nav-item">
			<a
				class="nav-link {categoryId && categoryId === category.id ? 'active' : undefined}"
				aria-current={categoryId && categoryId === category.id ? 'page' : undefined}
				href="/menu?categoryId={category.id}">{category.name}</a
			>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin-bottom: 50px;
	}
</style>
