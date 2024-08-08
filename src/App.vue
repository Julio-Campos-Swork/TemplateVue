<template>
	<v-app>
		<MainLayout />
	</v-app>
</template>

<script setup>
	import { onMounted, defineAsyncComponent } from 'vue'
	import { useUserStore } from './stores/UserStore'
	const MainLayout = defineAsyncComponent(() => import('@/layouts/MainLayout.vue'))
	const userStore = useUserStore()
	onMounted(async () => {
		await userStore.validateSession()
	})
</script>

<style>
	* {
		box-sizing: border-box;
		position: relative;
		min-width: 0;
	}
	html {
		min-height: 100dvh;
	}
</style>
