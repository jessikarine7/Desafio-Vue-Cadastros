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
      path: '/listagem-produtos',
      name: 'listagem-produtos',
      component: () => import('../views/ListagemProdutos.vue')
    },
    {
      path: '/listagem-clientes',
      name: 'listagem-clientes',
      component: () => import('../views/ListagemClientes.vue')
    }
  ]
})

export default router
