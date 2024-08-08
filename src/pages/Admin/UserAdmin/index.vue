<template>
	<v-container fluid>
		<h1 class="text-center text-h3 py-6">Administracion de Usuarios</h1>

		<v-tabs v-model="tab" align-tabs="center" color="blue-accent-3">
			<v-tab :value="1">Registrar usuarios</v-tab>
			<v-tab :value="2" @click="loadData()">Editar Usuarios</v-tab>
		</v-tabs>
		<v-tabs-window v-model="tab">
			<v-tabs-window-item :value="1">
				<NewUser />
			</v-tabs-window-item>
			<v-tabs-window-item :value="2">
				<EditUser ref="childRef" />
			</v-tabs-window-item>
		</v-tabs-window>
	</v-container>
</template>

<script setup>
	import { ref, defineAsyncComponent, onMounted } from 'vue'
	const NewUser = defineAsyncComponent(() => import('./components/NewUser.vue'))
	const EditUser = defineAsyncComponent(() => import('./components/EditUser.vue'))
	const tab = ref(null)
	const childRef = ref(null)

	function loadData() {
		if (childRef.value != null) {
			childRef.value.loadData()
		}
	}
</script>
