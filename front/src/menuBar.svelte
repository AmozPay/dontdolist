<script>
</script>

<nav>
	<ul>
		<li><a id=svelteLink href="https://svelte.dev/">Learn Svelte</a></li>
		<li><a href="#/">All tasks</a></li>
		<li><a href="#/">Current tasks</a></li>
		<li><a href="#/">Finished tasks</a></li>
	</ul>
</nav>

<style>
	nav ul {
		list-style-type: none;

	}

	nav li {
		padding: 10px;
		background-color: cornflowerblue;
		text-decoration: none;
		font-size: 1.3em;
	}


	nav li a {
		padding: 11px;
		text-decoration: none;
		color: white;
		transition: 0.3s;
		border-bottom: turquoise;
		border-width: 1em;
	}

	nav li a:hover {
		background-color: white;
		color: #444;
	}

	nav ul {
		display: flex;
		flex-direction: row;
		background-color: cornflowerblue;
		justify-content: center;
	}
</style>