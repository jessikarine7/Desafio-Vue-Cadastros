<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Menu from '@/components/Menu.vue';
import SideMenu from '@/components/SideMenu.vue';
</script>

<template>
  <Menu />  
  <SideMenu />
  <div class="rotas d-flex">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .rotas {
    background-color: rgb(248, 247, 247);
    height: calc(100vh - 65px);
    margin-top: 55px;
    margin-left: 57px;
    padding-top: 20px;
    box-sizing: border-box; 
  }
  @media (max-width:500px) {
    .rotas{
      margin-top: 20px;
    }
  }
</style>
