import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useGeneralStore } from './GeneralStore'
import { useRouter } from 'vue-router'
import { encriptar, desencriptar } from '@/utils/encryptStrings'
import { ServerError } from '@/utils/errors'
export const useUserStore = defineStore('userStore', () => {
  const router = useRouter()
  const useGeneral = useGeneralStore()
  const AUTH = ref(false)
  const AuthToken = ref([])
  const userData = reactive({ user: [] })

  async function loginUser(identifier, password) {
    useGeneral.generalLoading = true
    await getIP()
    const dataToSend = {
      identifier,
      password,
      ip_value: geoData.IP,
      city: geoData.city,
      country: geoData.country,
    }
    try {
      const { data } = await axios.post('auth/login', dataToSend)
      if (data.APP_VERSION != undefined) useGeneral.versionisUpdate = false
      if (!data.status) throw new ServerError(data.message, data.error)

      useGeneral.generalLoading = false
      userData.user = data.data.user

      const stringData = JSON.stringify(data.data)
      const encryptLocalStorage = encriptar(stringData)

      localStorage.setItem('A-user-loggged', encryptLocalStorage)
      AuthToken.value = {
        headers: {
          Authorization: `Bearer ${data.data.token}`,
        },
      }
      AUTH.value = true
      useGeneral.showNotification(data.message, 'green')
      router.push('/')
    } catch (error) {
      useGeneral.errorType(error, loginUser)
    }
  }

  async function registerUser(name, email, password, id_user_type) {
    useGeneral.generalLoading = true
    const dataToSend = {
      name,
      email,
      password,
      id_user_type,
    }
    try {
      const { data } = await axios.post('auth/register', dataToSend)
      // console.log({ register: data })
      if (data.APP_VERSION != undefined) useGeneral.versionisUpdate = false
      if (!data.status) throw new ServerError(data.message, data.error)

      useGeneral.showNotification(data.message, 'green')
    } catch (error) {
      useGeneral.errorType(error, registerUser)
    }
  }
  async function validateSession() {
    const dataLocalStorage = localStorage.getItem('A-user-loggged')
    if (dataLocalStorage) {
      const dataUser = desencriptar(dataLocalStorage)
      const decriptedString = JSON.parse(dataUser)

      userData.user = decriptedString.user
      AuthToken.value = {
        headers: {
          Authorization: `Bearer ${decriptedString.token}`,
        },
      }
      AUTH.value = true
    } else {
      userData.user = []
      AuthToken.value = {}
      AUTH.value = false
    }
  }
  async function logout() {
    useGeneral.generalLoading = true
    const dataToSend = {
      email: userData.user.email,
    }
    try {
      const { data } = await axios.post('auth/logout', dataToSend)
      console.log({ logout: data })
      if (data.APP_VERSION != undefined) useGeneral.versionisUpdate = false
      if (!data.status) throw new ServerError(data.message, data.error)
      useGeneral.showNotification(data.message, 'green')
    } catch (error) {
      useGeneral.errorType(error, logout)
    } finally {
      resetUserStore()
    }
  }

  const geoData = reactive({
    IP: '',
    city: '',
    country: '',
  })
  async function getIP() {
    try {
      await fetch('https://ipapi.co/json/')
        .then((response) => response.json())
        .then((data) => {
          geoData.IP = data.ip
          geoData.city = data.city
          geoData.country = data.country_name
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }
  function resetUserStore() {
    userData.user = []
    AuthToken.value = []
    AUTH.value = false
    geoData.IP = ''
    geoData.city = ''
    geoData.country = ''
    useGeneral.generalLoading = false
    localStorage.removeItem('A-user-loggged')
  }

  return {
    AUTH,
    AuthToken,
    userData,
    loginUser,
    validateSession,
    logout,
    registerUser,
    resetUserStore,
  }
})
