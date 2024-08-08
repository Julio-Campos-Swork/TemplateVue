<template>
	<v-container>
		<h1 class="text-center text-h2 py-4">Panel Administrativo</h1>

		<v-row>
			<v-col cols="12" md="6">
				<router-link class="navButtons mx-2 my-6" to="/admin/user-config"
					>Administracion de Usuarios</router-link
				>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup></script>

<style scoped>
	/* CSS */
	.navButtons {
		background-color: #ffffff;
		border: 1px solid #222222;
		border-radius: 8px;
		box-sizing: border-box;
		color: #222222;
		cursor: pointer;
		display: block;
		font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue',
			sans-serif;
		font-size: 16px;
		font-weight: 600;
		line-height: 20px;
		margin: 0;
		outline: none;
		padding: 13px 23px;
		position: relative;
		text-align: center;
		text-decoration: none;
		touch-action: manipulation;
		transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
			transform 0.1s;
		user-select: none;
		-webkit-user-select: none;
		width: auto;
	}

	.navButtons:focus-visible {
		box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
		transition: box-shadow 0.2s;
	}

	.navButtons:active {
		background-color: #f7f7f7;
		border-color: #000000;
		transform: scale(0.96);
	}

	.navButtons:disabled {
		border-color: #dddddd;
		color: #dddddd;
		cursor: not-allowed;
		opacity: 1;
	}
	.navButtons:hover {
		transition: ease-in-out;
		scale: 105%;
	}
</style>
