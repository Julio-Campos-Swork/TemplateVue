// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
const userLevelAccess = {
  admin: 1,
  user: 2,
}
const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },

  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
  },

  //admin
  {
    path: '/admin',
    name: 'Panel Administrativo',
    component: () => import('@/pages/Admin/index.vue'),
    meta: {
      requiresAuth: true,
      allowedLevels: [userLevelAccess.admin],
    },
  },
  {
    path: '/admin/user-config',
    name: 'Admnistracion de Usuarios',
    component: () => import('@/pages/Admin/UserAdmin/index.vue'),
    meta: {
      requiresAuth: true,
      allowedLevels: [userLevelAccess.admin],
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = useUserStore().AUTH
  const allowedLevels = to.meta.allowedLevels

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next('/login')
  } else if (
    allowedLevels &&
    !allowedLevels.includes(useUserStore().userData.user.id_user_type)
  ) {
    next('/home')
  } else {
    next()
  }
})
export default router
