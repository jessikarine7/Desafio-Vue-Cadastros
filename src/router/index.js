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
      path: '/cadastro-produtos',
      name: 'cadastro-produtos',
      component: () => import('../views/CadastroProdutos.vue')
    },
    {
      path: '/cadastro-cliente',
      name: 'cadastro-cliente',
      component: () => import('../views/CadastroCliente.vue')
    }
  ]
})

export default router
