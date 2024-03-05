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
    },
    {
      path: '/selecao-produtos',
      name: 'selecao-produtos',
      component: () => import('../views/SelecaoProdutos.vue')
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
