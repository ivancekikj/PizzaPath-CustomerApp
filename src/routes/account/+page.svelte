<script>
	import AccountPage from '$lib/accounts/view/pages/AccountPage.svelte'

	export let data
</script>

<AccountPage
	categoryCoupons={data.categoryCoupons}
	totalPostsCount={data.postsTotalCount}
	posts={data.posts}
/>
