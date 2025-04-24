<script lang="ts">
	import {OrderRepository} from "$lib/repository/OrderRepository";
	import type {Order} from "$lib/domain/models";
	import OrderItemCard from "$lib/view/components/OrderItemCard.svelte";
	import {MenuUtils} from "$lib/view/utils/MenuUtils";

	let order: Order;

	async function loadOrder(): Promise<void> {
		order = await OrderRepository.getCurrentItems();
	}

	function calculateTotalOrderPrice(): number {
		return order.items.map(MenuUtils.calculateTotalPrice).reduce((a, b) => a + b, 0);
	}
</script>

<svelte:head>
	<title>Pizza Delicious - Order</title>
</svelte:head>

{#await loadOrder() then _}
	<div class="container mt-100px mb-50px">
		<div class="row justify-content-between">
			<div class="col-8">
				{#each order.items as item}
					<OrderItemCard {item} />
				{/each}
			</div>
			<div class="col-3">
				<div class="card mb-50px">
					<div class="card-body">
						<h5 class="card-title mb-20px">Order Details</h5>
						<p class="card-text m-0">Order number: <span class="fw-bold">{order.id}</span></p>
						<p class="card-text m-0">Number of items: <span class="fw-bold">{order.items.length}</span></p>
						<p class="card-text m-0">Coupons redeemed: /</p>
						<p class="card-text m-0">Coupons earned: /</p>
						<p class="card-text mb-20px">Total: <span class="fw-bold">{calculateTotalOrderPrice()} ден</span></p>
						<p class="card-text">Status: <span class="fw-bold">{order.status}</span></p>
					</div>
				</div>
				<div class="mb-50px">
					<label for="description" class="form-label">Description</label>
					<textarea class="form-control" id="description"></textarea>
				</div>
				<div>
					<button class="btn red-button w-100 mb-20px">Empty Order</button>
					<button class="btn green-button w-100">Submit Order</button>
				</div>
			</div>
		</div>
	</div>
{/await}

<style>
	#description {
		resize: none;
		height: 200px
	}
</style>
