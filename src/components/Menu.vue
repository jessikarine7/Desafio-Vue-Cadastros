<script>
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="white"
        prominent
      >
        <v-icon 
          class="pl-8 pr-2"
          color="indigo-accent-4"
        >mdi-account-box-edit-outline</v-icon>

        <v-toolbar-title 
          class="font-weight-bold MenuTitle"
        >Sistema de Cadastros</v-toolbar-title>

        <v-spacer></v-spacer>

        <p 
          class="mx-4 Home"
        >Home</p>

        <v-btn 
          class="mr-8"
          color="indigo-accent-4" 
          variant="flat"
        >Entrar</v-btn> 
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<style lang="sass" scoped>
.MenuTitle
  color: #304ffe
  font-weigth: bold

.Home
  color: gray
</style>