<script>
	import OrderPage from '$lib/orders/view/pages/OrderPage.svelte';

    export let data;
</script>

<OrderPage order={data.order} />
