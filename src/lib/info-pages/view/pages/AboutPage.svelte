<svelte:head>
	<title>Pizza Delicious - About</title>
</svelte:head>

<div id="showcase" class="mb-100px d-flex align-items-center justify-content-center">
	<div id="showcase-content">
		<h1 class="text-center mb-20px fw-bold text-white">Our Story</h1>
		<div class="mb-20px d-flex justify-content-center">
			<p class="text-center text-white">
				From a small family kitchen to a neighborhood favorite — every pizza we make carries warmth,
				flavor, and tradition.
			</p>
		</div>
		<div class="d-flex justify-content-center">
			<a href="#philosophy" class="btn red-button px-4 py-2 fw-bold">Learn More</a>
		</div>
	</div>
</div>
<div class="container mb-100px">
	<section id="philosophy" class="mb-100px">
		<div class="container">
			<div class="row align-items-center justify-content-between gy-4">
				<div class="col-md-6">
					<img
						src="/img/about/foods.jpg"
						class="img-fluid rounded shadow-sm"
						alt="Pizza preparation"
					/>
				</div>
				<div class="col-md-5">
					<h2 class="fw-bold mb-3">Our Philosophy</h2>
					<p class="lead">
						We believe pizza should be simple, honest, and full of heart. Every dough is
						slow-fermented, every sauce made from scratch, and every topping freshly sourced from
						local farms.
					</p>
					<p>
						We bake each pizza in a stone oven at over 450°C for that perfect crisp and airy
						texture. No shortcuts, no compromises — just the art of real pizza-making.
					</p>
				</div>
			</div>
		</div>
	</section>
	<section id="team">
		<div class="container text-center">
			<h2 class="fw-bold mb-20px">Our Team & Community</h2>
			<p class="text-muted mb-50px">
				Meet the passionate people who bring Pizza Delicious to life and the community we proudly
				serve.
			</p>
			<div class="row g-4">
				<div class="col-md-4">
					<div class="card h-100 shadow-sm border-0">
						<img src="/img/about/marco.png" class="card-img-top team-img" alt="Chef Marco" />
						<div class="card-body">
							<h5 class="card-title fw-bold">Marco Rossi</h5>
							<p class="card-text">
								Head Chef trained in Naples. Marco brings traditional techniques and decades of
								pizza-making experience.
							</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100 shadow-sm border-0">
						<img src="/img/about/sofia.jpg" class="card-img-top team-img" alt="Sofia Rossi" />
						<div class="card-body">
							<h5 class="card-title fw-bold">Sofia Rossi</h5>
							<p class="card-text">
								Co-founder and hospitality expert. Sofia ensures every guest feels at home with
								authentic Italian warmth.
							</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100 shadow-sm border-0">
						<img src="/img/about/community.jpg" class="card-img-top team-img" alt="Community" />
						<div class="card-body">
							<h5 class="card-title fw-bold">Our Community</h5>
							<p class="card-text">
								We support local farms and host neighborhood pizza nights to share our love for
								great food and good company.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	#showcase {
		background: url('/img/about/pizza-preparation.jpg') no-repeat center center/cover;
		height: 800px;
	}

	.team-img {
		object-fit: cover;
		height: 220px;
		border-radius: 10px;
	}
</style>
