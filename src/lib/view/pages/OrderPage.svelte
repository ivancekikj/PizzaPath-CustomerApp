<script lang="ts">
	import {OrderRepository} from "$lib/repository/OrderRepository";

	OrderRepository.getCurrentItems().then(console.log)
</script>

<svelte:head>
	<title>Pizza Delicious - Order</title>
</svelte:head>

<h1>Order</h1>