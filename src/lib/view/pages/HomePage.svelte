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
<div class="container mb-100px"></div>

<style>
	#showcase {
		background: url('/img/home-showcase.jpg') no-repeat center center/cover;
		height: 800px;
	}

	#showcase-content h2 {
		mix-blend-mode: screen;
	}
</style>