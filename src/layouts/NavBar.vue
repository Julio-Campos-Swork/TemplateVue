<template>
	<v-app-bar color="indigo-lighten-1" elevation="0">
		<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
		<div class="pl-2">
			<img :src="logoGaren" width="90" height="30" />
		</div>
		<div class="d-flex px-2 flex-column" v-if="!generalStore.versionisUpdate">
			<p class="pt-1 text-center">¡Nueva versión disponible!</p>
			<v-btn color="yellow" @click="updateVersion()">Click para Actualizar</v-btn>
		</div>
		<v-spacer />
		<RouterLink to="/">
			<v-app-bar-title class="text-center pr-16 mr-4 mr-md-16 pr-md-8 text-md-h6"
				>Plantilla Sistema</v-app-bar-title
			>
		</RouterLink>
		<v-spacer />
		<div class="d-flex"></div>
		<div class="d-flex flex-column align-center pr-4">
			<v-btn
				@click="toggleTheme"
				:color="buttonThemeText == 'Light' ? 'grey-lighten-5' : 'black'"
				:icon="
					buttonThemeText === 'Light' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
				"
			></v-btn>
			<p class="text-sm-caption pb-1 mt-n2">Tema</p>
		</div>
	</v-app-bar>
	<v-navigation-drawer
		v-model="drawer"
		class="bg-indigo-lighten-1 z-1"
		disable-resize-watcher
	>
		<p class="text-center text-sm-caption text-md-h5 mt-2">Menu</p>
		<v-row justify="space-evenly" class="ma-3" v-if="userStore.AUTH">
			<p class="text-white">Usuario:</p>
			<p class="text-green font-weight-bold">{{ userStore.userData.user.name }}</p>
		</v-row>
		<v-list color="transparent" class="mt-4">
			<RouterLink v-for="(link, index) in navLinks" :key="index" :to="link.linkTo"
				><v-list-item
					@click="drawer = !drawer"
					:prepend-icon="link.prependIcon"
					class="text-sm-body-1 text-md-subtitle-1"
					v-if="link.isVisible"
					>{{ link.listText }}
				</v-list-item></RouterLink
			>
		</v-list>

		<p class="text-center mt-4">
			Version: <span class="text-orange">{{ AppVersion }}</span>
		</p>
		<template v-slot:append>
			<div class="pa-8">
				<RouterLink to="/home" v-if="userStore.AUTH" @click="drawer = !drawer">
					<v-btn color="red" @click="userStore.logout()" block> Cerrar Sesion </v-btn>
				</RouterLink>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { useTheme } from 'vuetify'
	import logoGaren from '@/assets/garen.png'
	import { useUserStore } from '@/stores/UserStore'
	import { useGeneralStore } from '@/stores/GeneralStore'
	const generalStore = useGeneralStore()
	const userStore = useUserStore()
	const AppVersion = ref(import.meta.env.VITE_APP_VERSION)
	const buttonThemeText = ref('Light')
	const theme = useTheme()
	const drawer = ref(false)
	const toggleTheme = () => {
		theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
		buttonThemeText.value = buttonThemeText.value === 'Dark' ? 'Light' : 'Dark'
	}
	const navLinks = ref([
		{
			linkTo: '/',
			prependIcon: 'mdi-home',
			listText: 'Inicio',
			isVisible: true,
		},
		{
			linkTo: '/login',
			prependIcon: 'mdi-login',
			listText: 'Iniciar Sesión',
			isVisible: true,
		},
		{
			linkTo: '/admin',
			prependIcon: 'mdi-account-plus',
			listText: 'Panel Administrativo',
			isVisible: computed(
				() => userStore.AUTH && [1].includes(userStore.userData.user.id_user_type)
			),
		},
	])

	function updateVersion() {
		location.reload()
	}
</script>

<style scoped>
	a:link,
	a:visited,
	a:active {
		text-decoration: none;
		color: white;
	}
</style>
