/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { es } from 'vuetify/locale'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: { locale: 'es', messages: { es } },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#161616',
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      light: {
        colors: {
          background: '#F1F1F1',
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
