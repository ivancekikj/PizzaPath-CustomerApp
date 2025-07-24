<script lang="ts">
	import CouponsAccordion from "$lib/view/components/CouponsAccordion.svelte";
</script>

<svelte:head>
	<title>Pizza Delicious - Account</title>
</svelte:head>

<div class="container mt-100px mb-100px">
	<div class="row justify-content-between">
		<div class="col-8"></div>
		<div class="col-3">
			<h1 class="mb-50px">Earned coupons</h1>
			<CouponsAccordion />
		</div>
	</div>
</div>
