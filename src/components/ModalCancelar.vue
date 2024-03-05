<script setup>
import { ref } from 'vue';

const dialog = ref(true);

const fecharModal = () => {
  dialog.value = false;
}

</script>

<template>
  <v-dialog
    v-model="dialog"
    width="400"
  >
    <v-card
      class="d-flex align-center pa-6"
      height="220"
    >
      <v-icon class="mb-4" size="50" color="red-darken-4">mdi-alert-circle</v-icon>
      <p class="titulo">Tem certeza que deseja cancelar?</p>

      <v-row class="mt-8">
        <v-btn
          class="mr-4"
          width="70" 
          variant="outlined"
          color="red-darken-4"
          @click="fecharModal"
        >Não</v-btn>
  
        <v-btn
          width="70" 
          variant="outlined"
          color="indigo-accent-4"
          :to="{name: 'home'}"
        >Sim</v-btn>
      </v-row>

    </v-card>
  </v-dialog>
</template> 

<style lang="scss" scoped>
  .titulo{
    font-weight: 300;
    font-size: 20px;
  }
</style>


