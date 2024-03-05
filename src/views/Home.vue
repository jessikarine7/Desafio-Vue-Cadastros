<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const items = ref([
  { title: 'Cadastro Clientes', subtitle: 'Cadastrar um novo cliente', path: '/cadastro-cliente' },
  { title: 'Cadastro Produto', subtitle: 'Cadastrar um novo produto', path: '/cadastro-produtos' },
  { title: 'Seleção de Produtos', subtitle: 'Selecionar um produto', path: '/selecao-produtos' },
  { title: 'Listagem Geral', subtitle: 'Listagem de clientes e seus produtos', path: '/listagem-geral' },
  { title: 'Listagem Produtos', subtitle: 'Listagem de produtos', path: '/listagem-produtos' },
  { title: 'Listagem Clientes', subtitle: 'Listagem de clientes', path: '/listagem-clientes' },
])
const router = useRouter()

const navigate = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="d-flex flex-column">
    <p class="tituloHome pl-4">Lista de Opções</p>

    <v-row class="pa-5">
      <v-col
        v-for="(item, index) in items"
        :key="index"
        style="min-width: 420px"
      >
        <v-card 
          @click="navigate(item.path)"
          color="white" 
          class="d-flex elevation-5 mr-4"
        >
          <v-col class="detalheCard"></v-col>

          <v-col class="cardTitulo" cols="9">
            <v-card-title class="titleCard">
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ item.subtitle }}
            </v-card-subtitle>
          </v-col>

          <v-col class="d-flex align-center">
            <v-btn 
              color="indigo-accent-4" 
              icon="mdi-menu-right"
            ></v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<style lang="scss" scoped>
  .titleCard{
    font-weight: bold;
    color: #1E319E;
  }
  .tituloHome{
    font-weight: bold;
    font-size: 30px;
    margin-top: 50px;
  }
  .detalheCard{
    background: #304ffe;
    width: 5px;
    border-radius: 10px 0px 0px 10px;
  }
  :deep(.detalheCard){
    flex-basis: 0;
    flex-grow: 0;
    max-width: 0;
  }
  :deep(.v-card){
    border-radius: 10px 10px 10px 10px;
  }
  :deep(.v-col){
    flex-grow: 0;
    padding: 8px;
  }
  :deep(.v-row){
    flex: 0;
  }
</style>
