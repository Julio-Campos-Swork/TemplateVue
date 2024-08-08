<template>
	<NavBar />
	<v-main>
		<router-view class="h-100" />
		<Notifications />
		<Loader />
		<FooterNav />
	</v-main>
</template>

<script setup>
	import NavBar from './NavBar.vue'
	import FooterNav from './Footer.vue'
	import Notifications from '@/components/utils/Notifications.vue'
	import Loader from '@/components/utils/Loader.vue'
</script>

<style scoped></style>
