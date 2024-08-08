<template>
	<v-container fluid>
		<h1 class="text-center">Hello World!</h1>
	</v-container>
</template>

<script setup>
	import { useGeneralStore } from '@/stores/GeneralStore'

	const useGeneral = useGeneralStore()
</script>
