<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function clickHome () {
  router.push({ name: 'home' });
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="white"
        prominent
        height="58"
      >
        <v-icon 
          class="pl-8 pr-2"
          color="indigo-accent-4"
        >mdi-account-box-edit-outline</v-icon>

        <v-toolbar-title 
          class="font-weight-bold MenuTitle"
        >Sistema de Cadastros</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn 
          class="mx-4 Home"
          text
          @click="clickHome"
        >Home</v-btn>

        <v-btn 
          class="mr-8"
          color="indigo-accent-4" 
          variant="flat"
          small
        >Entrar</v-btn> 
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<style lang="scss" scoped>
  .MenuTitle{
    color: #304ffe;
    font-weigth: bold;
  }
  .Home{
    color: gray;
  }
</style>