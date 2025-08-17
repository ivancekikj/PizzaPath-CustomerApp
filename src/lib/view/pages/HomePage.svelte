<svelte:head>
	<title>Pizza Delicious - Home</title>
</svelte:head>

<div id="showcase" class="mb-100px d-flex align-items-center justify-content-center">
	<div id="showcase-content">
		<h1 class="text-center mb-50px fw-bold text-white">Welcome to Pizza Delicious!</h1>
		<div class="mb-50px d-flex justify-content-center">
			<h2 class="text-center fw-bold py-4 px-5 rounded rounded-2 bg-white">
				Are you hungry?<br>
				Don't wait!<br>
				Order now!
			</h2>
		</div>
		<div class="d-flex justify-content-center">
			<a href="/menu" class="btn green-button px-4 py-2 fw-bold">View Menu</a>
		</div>
	</div>
</div>
<div class="container mb-100px">
	<div class="text-center mb-5">
		<h2 class="fw-bold mb-20px">Our Services</h2>
		<p class="text-muted w-75 mx-auto mb-50px">
			At Pizza delicious, we serve fresh, authentic Italian flavors right to your table or doorstep.
			Whether you're dining in, ordering out, or planning a party, we’ve got you covered!
		</p>
		<div class="row g-4">
			<div class="col-md-3">
				<div class="service-card text-center overflow-hidden">
					<img class="w-100 object-fit-cover" src="/img/home/wood-fire-pizza.jpg" alt="Wood-Fired Pizza">
					<h5 class="service-title fw-bold">Wood-Fired Pizza</h5>
					<p>
						Enjoy handcrafted pizzas baked in our traditional wood-fired oven,
						made with fresh dough, authentic sauces, and premium toppings.
					</p>
				</div>
			</div>
			<div class="col-md-3">
				<div class="service-card text-center overflow-hidden">
					<img class="w-100 object-fit-cover" src="/img/home/fast-delivery.jpg" alt="Delivery Service">
					<h5 class="service-title fw-bold">Fast Delivery</h5>
					<p>
						Craving pizza at home? Our speedy delivery brings piping hot pizzas, pastas, and sides
						straight to your door while they’re still fresh.
					</p>
				</div>
			</div>
			<div class="col-md-3">
				<div class="service-card text-center overflow-hidden">
					<img class="w-100 object-fit-cover" src="/img/home/event-catering.jpg" alt="Catering Service">
					<h5 class="service-title fw-bold">Event Catering</h5>
					<p>
						Hosting a party or office lunch? Let us cater with custom pizza platters,
						fresh salads, and delicious desserts that everyone will love.
					</p>
				</div>
			</div>
			<div class="col-md-3">
				<div class="service-card text-center overflow-hidden">
					<img class="w-100 object-fit-cover" src="/img/home/dine-in.jpg" alt="Dine-In Experience">
					<h5 class="service-title fw-bold">Cozy Dine-In</h5>
					<p>
						Relax in our warm and inviting restaurant atmosphere,
						perfect for family dinners, date nights, or catching up with friends.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#showcase {
		background: url('/img/home/home-showcase.jpg') no-repeat center center/cover;
		height: 800px;
	}

	#showcase-content h2 {
		mix-blend-mode: screen;
	}

	.service-card {
		border-radius: 10px;
		background-color: #f8f9fa;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		padding: 1rem;
	}

	.service-card img {
		height: 180px;
		border-radius: 10px;
	}

	.service-title {
		margin-top: 1rem;
	}
</style>