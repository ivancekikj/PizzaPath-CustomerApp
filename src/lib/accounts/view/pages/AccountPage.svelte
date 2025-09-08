<script lang="ts">
	import CouponsAccordion from '$lib/accounts/view/components/coupons/CouponsAccordion.svelte'
	import type { CategoryCoupons, NewsletterPost } from '$lib/accounts/domain/models'
	import NewsletterPosts from '$lib/accounts/view/components/newsletter/NewsletterPosts.svelte'
	import UpdateCustomerForm from '$lib/accounts/view/components/account/forms/UpdateCustomerForm.svelte'

	export let categoryCoupons: CategoryCoupons[]
	export let posts: NewsletterPost[]
	export let totalPostsCount: number
</script>

<svelte:head>
	<title>Pizza Delicious - Account</title>
</svelte:head>

<div class="container mt-100px mb-100px">
	<div class="row justify-content-between mb-100px">
		<div class="col-8">
			<h1 class="mb-50px">Received newsletter posts</h1>
			<NewsletterPosts {posts} totalCount={totalPostsCount} />
		</div>
		<div class="col-3">
			<h1 class="mb-50px">Earned coupons</h1>
			<CouponsAccordion {categoryCoupons} />
		</div>
	</div>
	<div class="row">
		<UpdateCustomerForm />
	</div>
</div>
