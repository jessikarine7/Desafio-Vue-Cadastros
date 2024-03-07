import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/register-product',
      name: 'register-product',
      component: () => import('../views/RegisterProduct.vue')
    },
    {
      path: '/register-client',
      name: 'register-client',
      component: () => import('../views/RegisterClient.vue')
    },
    {
      path: '/list-products',
      name: 'list-products',
      component: () => import('../views/ListProducts.vue')
    },
    {
      path: '/list-clients',
      name: 'list-clients',
      component: () => import('../views/ListClients.vue')
    }
  ]
})

export default router
