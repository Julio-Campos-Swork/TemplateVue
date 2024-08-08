import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useUserStore } from './UserStore'
import { ServerError } from '@/utils/errors'
import { useGeneralStore } from './GeneralStore'

export const useAdminStore = defineStore('AdminStore', () => {
  const userStore = useUserStore()
  const useGeneral = useGeneralStore()

  async function getUserList() {
    try {
      const { data } = await axios.get('admin/getUserList', userStore.AuthToken)

      console.log({ getUserList: data })
      if (data.APP_VERSION != undefined) useGeneral.versionisUpdate = false
      if (!data.status) throw new ServerError(data.message, data.error)

      return data.data
    } catch (error) {
      useGeneral.errorType(error, getUserList)
    }
  }

  async function updateUserInfo(userInfo) {
    const dataToSend = {
      ...userInfo,
    }
    try {
      const { data } = await axios.post(
        'admin/updateUserInfo',
        dataToSend,
        userStore.AuthToken
      )

      if (data.APP_VERSION != undefined) useGeneral.versionisUpdate = false
      if (!data.status) throw new ServerError(data.message, data.error)
      console.log({ updateUserInfo: data })
      useGeneral.showNotification(data.message, 'green')
    } catch (error) {
      useGeneral.errorType(error, updateUserInfo)
    }
  }
  async function updateUserPassword(id_user, newPassword) {
    const dataToSend = {
      id_user,
      newPassword,
    }
    try {
      const { data } = await axios.post(
        'admin/updateUserPassword',
        dataToSend,
        userStore.AuthToken
      )

      if (data.APP_VERSION != undefined) useGeneral.versionisUpdate = false
      if (!data.status) throw new ServerError(data.message, data.error)
      console.log({ updateUserPassword: data })
      useGeneral.showNotification(data.message, 'green')
    } catch (error) {
      useGeneral.errorType(error, updateUserPassword)
    }
  }

  return {
    getUserList,
    updateUserInfo,
    updateUserPassword,
  }
})
