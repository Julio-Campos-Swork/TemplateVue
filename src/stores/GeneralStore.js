import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { retryConnection } from '@/utils/retryConnection.js'

export const useGeneralStore = defineStore('GeneralStore', () => {
  const versionisUpdate = ref(true)
  const generalLoading = ref(false)

  //notification area
  const statusNotification = ref(false)
  const messageColor = ref('')
  const messageText = ref('')

  /**
   * The function `showNotification` displays a notification with a specified text and color, with a
   * default color of "yellow".
   * @param text - The `text` parameter is a string that represents the message or notification that
   * you want to display.
   * @param [color=yellow] - The `color` parameter in the `showNotification` function is optional and
   * has a default value of "yellow". If a color is not provided when calling the function, it will
   * default to "yellow".
   */
  function showNotification(text, color = 'yellow') {
    statusNotification.value = true
    messageColor.value = color
    messageText.value = text
    generalLoading.value = false
  }

  /**
   * The function `errorType` handles different types of errors and triggers specific actions based on
   * the error type.
   * @param error - The `error` parameter seems to be an object that contains information about an
   * error. It may have properties like `code`, `status`, and `message`. The function `errorType`
   * checks the properties of the error object and performs different actions based on the type of
   * error.
   * @param callback - A function that will be called to handle the error.
   */
  function errorType(error, callback) {
    error.code == 'ERR_NETWORK' || error.status == 'ERR_BAD_RESPONSE'
      ? errorNetworkRetry(callback)
      : showNotification(error?.response?.data?.message || 'Error en servidor')
    console.log({ errorType: error })
  }

  /**
   * The function `errorNetworkRetry` attempts to retry a network connection up to 5 times before
   * showing a notification if unsuccessful.
   * @param callback - The `callback` parameter in the `errorNetworkRetry` function is a function that
   * will be called to retry the network connection.
   */
  const retries = ref(0)
  const setGeneralLoading = (value) => (generalLoading.value = value)
  function errorNetworkRetry(callback) {
    if (retries.value < 5) {
      retryConnection(callback, retries.value, setGeneralLoading)
      retries.value++
    } else {
      showNotification(
        'Error de red, por favor verifica tu conexión a internet o comunicate a soporte.',
        'red'
      )
      retries.value = 0
      generalLoading.value = false
    }
  }

  return {
    statusNotification,
    messageColor,
    messageText,
    generalLoading,
    versionisUpdate,
    showNotification,
    errorType,
  }
})
