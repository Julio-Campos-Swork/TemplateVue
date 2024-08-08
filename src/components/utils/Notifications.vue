<template>
	<v-snackbar
		rounded="lg"
		v-model="useGeneral.statusNotification"
		:color="useGeneral.messageColor"
		location="top"
		:timeout="3000"
	>
		<p class="text-center text-subtitle-1">{{ useGeneral.messageText }}</p></v-snackbar
	>
</template>

<script setup>
	import { useGeneralStore } from '@/stores/GeneralStore'
	const useGeneral = useGeneralStore()
</script>
