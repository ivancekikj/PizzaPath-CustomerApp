<script>
	import { onMount } from 'svelte';

	onMount(() => {
		window.$('[data-bs-toggle="tooltip"]').tooltip()
	});
</script>

<style>
	nav {
		background: #1a1a1a !important;
	}

	#logo {
		height: 64px;
	}

	.nav-item.dropdown:hover .dropdown-menu {
		display: block;
	}
</style>

<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
	<div class="container">
		<a class="navbar-brand" href="/">
			<img id="logo" src="/img/logo.svg" alt="Company logo">
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNavDropdown"
			aria-controls="navbarNavDropdown"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/about">About</a>
				</li>
				<li class="nav-item dropdown">
					<a
						class="nav-link dropdown-toggle"
						href="/menu"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Menu
					</a>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="#">Whole Menu</a></li>
						<li><a class="dropdown-item" href="#">Category 1</a></li>
						<li><a class="dropdown-item" href="#">Category 2</a></li>
						<li><a class="dropdown-item" href="#">Category 3</a></li>
					</ul>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/order">Order</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/account">Account</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/register">Register</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/login">Login</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
