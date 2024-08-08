<template>
	<v-container fluid>
		<v-data-table
			:headers="headers"
			:items="userList !== null ? userList : []"
			:loading="loading"
		>
			<!-- header configuratoipn -->
			<template class="w-100" v-slot:header.name="{ column }">
				<p class="px-0 mx-0 text-center">{{ column.title }}</p>
			</template>
			<template class="" v-slot:header.email="{ column }">
				<p class="px-0 mx-0 text-center">{{ column.title }}</p>
			</template>
			<template class="" v-slot:header.id_user_type="{ column }">
				<p class="px-0 mx-0 text-center">{{ column.title }}</p>
			</template>
			<template class="w-50" v-slot:header.status="{ column }">
				<p class="px-0 mx-0 text-center">{{ column.title }}</p>
			</template>
			<template class="w-50" v-slot:header.password="{ column }">
				<p class="px-0 mx-0 text-center">{{ column.title }}</p>
			</template>
			<template class="w-50" v-slot:header.actions="{ column }">
				<p class="px-0 mx-0 text-center">{{ column.title }}</p>
			</template>

			<!-- items configuracion -->
			<template v-slot:item.name="{ item, index }">
				<div class="d-flex justify-center w-100 px-8">
					<p v-if="idIndexToEdit != index">{{ item.name }}</p>
					<v-text-field v-model="item.name" variant="underlined" v-else> </v-text-field>
				</div>
			</template>
			<template v-slot:item.email="{ item, index }">
				<div class="d-flex justify-center w-100">
					<p v-if="idIndexToEdit != index">{{ item.email }}</p>
					<v-text-field v-model="item.email" variant="underlined" v-else> </v-text-field>
				</div>
			</template>

			<template class="" v-slot:item.id_user_type="{ item, index }">
				<div class="d-flex justify-center w-100">
					<p v-if="idIndexToEdit != index">
						{{ userType[item.id_user_type - 1].name }}
					</p>

					<v-select
						v-else
						v-model="item.id_user_type"
						:items="userType != null ? userType : []"
						item-title="name"
						item-value="id"
						variant="underlined"
						@update:modelValue="updateUserInfo(item)"
					>
					</v-select>
				</div>
			</template>

			<template v-slot:item.actions="{ item, index }">
				<div class="position-absolute top-0 pt-4" v-if="idIndexToEdit != index">
					<div class="d-flex flex-column justify-center">
						<v-icon
							class="pl-10"
							icon="mdi-pencil-circle"
							color="info"
							size="large"
							@click="idIndexToEdit = index"
						></v-icon>
						<span class="pl-5 pt-1 text-subtitle-1">Editar</span>
					</div>
				</div>
				<div class="position-absolute top-0 pt-4 pl-4" v-else>
					<div class="d-flex flex-column px-0 mx-0">
						<v-icon
							class="pl-6"
							icon="mdi-check-circle"
							color="green"
							size="large"
							@click="updateUserInfo(item)"
						></v-icon>
						<p class="pt-1 pr-2 text-subtitle-1">Guardar</p>
					</div>
				</div>
			</template>

			<template v-slot:item.status="{ item, index }">
				<div class="d-flex justify-center pr-4">
					<v-checkbox
						v-model="item.status"
						color="info"
						:true-value="1"
						:false-value="0"
						@update:modelValue="updateUserInfo(item)"
					>
						<template v-slot:prepend>
							<p class="position-absolute pt-16 pl-3">
								{{ item.status === 1 ? 'Activo' : 'Inactivo' }}
							</p>
						</template>
					</v-checkbox>
				</div>
			</template>

			<template v-slot:item.password="{ item, index }">
				<div class="d-flex justify-center">
					<v-btn
						class="text-capitalize"
						size="small"
						color="red-darken-3"
						@click="openDiagPassword(item.id)"
						>Cambiar Contraseña</v-btn
					>
				</div>
			</template>
		</v-data-table>
		<v-dialog v-model="dialogPassword" max-width="500" persistent>
			<v-card>
				<v-card-title class="text-center bg-indigo-lighten-1"
					>Cambiar Contraseña</v-card-title
				>
				<v-card-text>
					<v-text-field
						v-model="newPassword"
						label="Ingresa nueva contraseña"
						required
						type="password"
						:rules="[
							(v) => !!v || 'Contraseña requerida',
							(v) => (v && v.length >= 6) || 'La contraseña debe ser minimo 6 caracteres',
						]"
					>
					</v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn class="text-capitalize" color="green" @click="saveNewPassword()"
						>Cambiar Contraseña</v-btn
					>
					<v-btn class="text-capitalize" color="red" @click="cancelPassword()"
						>Cancelar</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useAdminStore } from '@/stores/AdminStore'
	const adminStore = useAdminStore()
	defineExpose({ loadData })

	const headers = [
		{ title: 'Nombre', key: 'name' },
		{ title: 'Email', key: 'email', sortable: false },
		{ title: 'Tipo de Usuario', key: 'id_user_type', sortable: false },
		{ title: 'Editar', key: 'actions', sortable: false },
		{ title: 'Estatus', key: 'status', sortable: false },
		{ title: 'Contraseña', key: 'password', sortable: false },
	]
	const userList = ref([])
	const loading = ref(false)
	async function loadData() {
		loading.value = true
		const dataUsers = await adminStore.getUserList()
		userList.value = dataUsers.users
		userType.value = dataUsers.user_type
		loading.value = false
	}
	async function updateUserInfo(userInfo) {
		await adminStore.updateUserInfo(userInfo)
		await loadData()
		idIndexToEdit.value = null
	}

	const userType = ref([])
	const idIndexToEdit = ref(null)
	const dialogPassword = ref(false)
	const newPassword = ref(null)
	const id_user_password = ref(null)
	async function saveNewPassword() {
		await adminStore.updateUserPassword(id_user_password.value, newPassword.value)
		dialogPassword.value = false
		newPassword.value = null
		id_user_password.value = null
	}
	function openDiagPassword(itemID) {
		id_user_password.value = itemID
		dialogPassword.value = true
	}

	function cancelPassword() {
		newPassword.value = null
		dialogPassword.value = false
		id_user_password.value = null
	}

	onMounted(async () => {
		await loadData()
	})
</script>
