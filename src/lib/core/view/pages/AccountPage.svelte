<script lang="ts">
	import CouponsAccordion from "$lib/core/view/components/CouponsAccordion.svelte";
	import type {CategoryCoupons} from "$lib/core/domain/models";
	import {CouponRepository} from "$lib/core/repository/CouponRepository";
	import NewsletterPosts from "$lib/core/view/components/NewsletterPosts.svelte";
	import UpdateCustomerForm from "$lib/core/view/components/UpdateCustomerForm.svelte";

	let categoryCoupons: CategoryCoupons[];

	async function loadData(): Promise<void> {
		const couponsByCategoryId = await CouponRepository.getDetailedCouponInformation();
		categoryCoupons = Array.from(couponsByCategoryId.values()).sort((a, b) => a.categoryName.localeCompare(b.categoryName));
	}
</script>

<svelte:head>
	<title>Pizza Delicious - Account</title>
</svelte:head>

{#await loadData() then _}
	<div class="container mt-100px mb-100px">
		<div class="row justify-content-between mb-100px">
			<div class="col-8">
				<h1 class="mb-50px">Received newsletter posts</h1>
				<NewsletterPosts />
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
{/await}