<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import MenuVertical from './components/MenuVertical.vue'
</script>

<template>
  <Menu />  
  <MenuVertical />
  <div class="Rotas">
    <RouterView />
  </div>
</template>

<style lang="sass" scoped>
 .Rotas 
    background-color: rgb(228, 228, 228)
    width: 100%
    height: 100%
    margin-top: 65px
    margin-left: 57px
    padding: 20px
</style>
