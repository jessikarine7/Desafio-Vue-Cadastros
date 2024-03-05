<script setup>
</script>

<template>
  <v-card style="z-index:99">
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        class="elevation-5"
        style="margin-top: 65px;"
      >
        <v-list 
          class="d-flex align-center"
        >
          <v-icon 
            class="px-7"
          >mdi-account-circle</v-icon>

          <v-list-item
            subtitle="usuario.teste@gmail.com"
            title="Usuário Teste"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item 
            prepend-icon="mdi-home" 
            title="Home" 
            value="home"
            :to="{ name: 'home' }"
          ></v-list-item>

          <v-list-item 
            prepend-icon="mdi-account-multiple" 
            title="Cadastro Cliente" 
            value="cadastroCliente"
            :to="{ name: 'cadastro-cliente' }"
          ></v-list-item>

          <v-list-item 
            prepend-icon="mdi-package-variant-plus" 
            title="Cadastro Produtos" 
            value="cadastroProdutos"
            :to="{ name: 'cadastro-produtos' }"
          ></v-list-item>

          <v-list-item 
            prepend-icon="mdi-checkbox-marked-circle" 
            title="Seleção de Produtos" 
            value="selecaoProdutos"
            :to="{ name: 'selecao-produtos' }"
          ></v-list-item>

          <v-list-item 
            prepend-icon="mdi-list-box" 
            title="Listagem Produtos" 
            value="listagemProdutos"
            :to="{ name: 'listagem-produtos' }"
            ></v-list-item>

          <v-list-item 
            prepend-icon="mdi-list-box" 
            title="Listagem Clientes" 
            value="listagemClientes"
            :to="{ name: 'listagem-clientes' }"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<style lang="sass" scoped>
</style>