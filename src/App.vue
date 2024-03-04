<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import MenuVertical from './components/MenuVertical.vue'
</script>

<template>
  <Menu />  
  <MenuVertical />
  <div class="Rotas d-flex">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .Rotas {
    background-color: rgb(228, 228, 228);
    width: 100%;
    height: calc(100vh - 65px);
    margin-top: 65px;
    margin-left: 57px;
    padding: 20px;
    box-sizing: border-box; 
  }
</style>
