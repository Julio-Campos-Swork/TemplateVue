import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from '@/plugins'

import axios from 'axios'
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true
window.axios.defaults.withXSRFToken = true
window.axios.defaults.headers.common['APP-VERSION'] =
  import.meta.env.VITE_APP_VERSION
window.axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const app = createApp(App)
registerPlugins(app)

app.mount('#app')
