<script setup>
import { ref, computed } from 'vue'

const dialog = ref(true)
const fecharModal = () => {
  dialog.value = false;
}

const switchStatus = ref(false)
const statusLabel = computed(() => switchStatus.value ? 'Ativo' : 'Inativo')
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="800"
    height="600"
  >
    <v-card class="d-flex pa-8">
      <p class="titulo">Modal Editar</p>

      <v-form class="mt-6">
        <v-text-field 
          label="Nome"
          variant="outlined"
          clearable 
        ></v-text-field>

        <v-text-field 
          variant="outlined"
          label="Quantidade"
          clearable
        ></v-text-field>

        <v-switch
          :label="`Status: ${statusLabel}`"
          v-model="switchStatus"
          color="indigo-accent-4"
          hide-details
          inset
          clearable
        ></v-switch>
      </v-form>

      <v-row class="mt-8 d-flex justify-center">
        <v-btn
          class="mr-4"
          width="150" 
          color="red-darken-4"
          @click="fecharModal"
        >Cancelar</v-btn>
  
        <v-btn
          width="150" 
          color="indigo-accent-4"
          :to="{name: 'home'}"
        >Confirmar</v-btn>
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