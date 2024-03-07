<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const items = ref([
    { 
      title: 'Cadastro Clientes', 
      subtitle: 'Cadastrar um novo cliente', 
      path: '/register-client' 
    },
    { 
      title: 'Cadastro Produto', 
      subtitle: 'Cadastrar um novo produto', 
      path: '/register-product' 
    },
    { 
      title: 'Listagem Clientes', 
      subtitle: 'Listagem de clientes', 
      path: '/list-clients' 
    },
    { 
      title: 'Listagem Produtos', 
      subtitle: 'Listagem de produtos', 
      path: '/list-products' 
    },
  ]);
</script>

<template>
  <div class="d-flex flex-column container pl-7">
    <p class="titleHome pl-4">
      Lista de Opções
    </p>

    <v-row>
      <v-col
        data-testid="column"
        v-for="(item, index) in items"
        :key="index"
        class="col"
      >
        <v-card 
          @click="navigate(item.path)"
          color="white" 
          class="d-flex elevation-5 mr-4 cardContainer"
        >
          <v-col class="detailsCard"></v-col>

          <v-col cols="9">
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
  @media (max-width:500px){
    .titleCard{
      font-size: 18px;
    }
  }
  @media (max-width:900px){
    .titleHome{
      font-size: 18px;
    }
    .cardContainer{
      min-width: 300px;
      height: 70px;
    }
    .titleCard{
      font-size: 16px;
    }
  }
  .col{
    min-width: 380px;
  }
  .titleCard{
    font-weight: bold;
    color: #1E319E;
    font-size: 18px;
  }
  .titleHome{
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 15px;
  }
  .detailsCard{
    background: #304ffe;
    width: 5px;
    border-radius: 10px 0px 0px 10px;
  }
  :deep(.v-card .v-card-title){
    line-height: 12px;
  }
  :deep(.detailsCard){
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
