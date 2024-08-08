<template>
	<v-container fluid class="d-flex justify-center align-center">
		<v-card elevation="24" width="440">
			<v-card-title class="text-center bg-indigo-lighten-1">Registrar</v-card-title>
			<v-card-text class="mt-6">
				<v-text-field
					v-model="registerData.name"
					label="Nombre"
					:rules="userRules"
					variant="solo-filled"
					class="py-2"
				></v-text-field>
				<v-text-field
					v-model="registerData.email"
					label="Email/Usuario"
					type="email"
					:rules="emailRules"
					variant="solo-filled"
					class="py-2"
				></v-text-field>
				<v-text-field
					v-model="registerData.password"
					label="Contraseña"
					type="password"
					variant="solo-filled"
					class="py-2"
					:rules="passRules"
					border
					@keypress.enter="handleRegister()"
				></v-text-field>
				<v-select
					v-model="registerData.user_type"
					:items="userType != null ? userType : []"
					label="Tipo de Usuario"
					item-value="id"
					item-title="name"
				>
				</v-select>
				<div class="d-flex justify-center py-6">
					<v-btn
						:disabled="
							registerData.name == null ||
							registerData.email == null ||
							registerData.password == null ||
							registerData.user_type == null
						"
						color="green-darken-2"
						rounded="lg"
						@click="handleRegister()"
						>Registrar</v-btn
					>
				</div>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import { useUserStore } from '@/stores/UserStore'
	import { useAdminStore } from '@/stores/AdminStore'
	const adminStore = useAdminStore()
	const useUser = useUserStore()
	const registerData = reactive({
		name: null,
		email: null,
		password: null,
		user_type: null,
	})
	async function handleRegister() {
		await useUser.registerUser(
			registerData.name,
			registerData.email,
			registerData.password,
			registerData.user_type
		)
		registerData.name = null
		registerData.email = null
		registerData.password = null
		registerData.user_type = null
	}
	onMounted(async () => {
		const dataUsers = await adminStore.getUserList()
		userType.value = dataUsers.user_type
	})
	const userType = ref(null)
	const userRules = [
		(v) => !!v || 'Usuario requerido',
		(v) => (v && v.length > 4) || 'Usuario invalido',
	]
	const passRules = [
		(v) => !!v || 'Contraseña requerida',
		(v) => (v && v.length >= 6) || 'La contraseña debe ser minimo 6 caracteres',
	]

	const emailRules = [
		(v) => !!v || 'Correo requerido',
		(v) =>
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				v
			) || 'Ingresa correo válido',
	]
</script>
