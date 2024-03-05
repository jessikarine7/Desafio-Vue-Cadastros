<script setup>
  import { ref } from 'vue'
  import ModalCancelar from '../components/ModalCancelar.vue'
  import ModalConfirmar from '../components/ModalConfirmar.vue'

  const showModalCancel = ref(false);
  const showModalConfirm = ref(false);
</script>

<template>
  <div class="container d-flex justify-center elevation-2">
    <ModalCancelar v-if="showModalCancel" @close="showModalCancel = false" />
    <ModalConfirmar v-if="showModalConfirm" @close="showModalConfirm = false" />

    <v-card 
      class="pa-4 d-flex justify-space-between flex-column" 
      color="white" 
      min-width="500" 
      height="670"
    >
      <v-col>
        <p class="pa-4 d-flex justify-center title"
        >Seleção de produtos</p>
  
        <v-select 
          class="mb-4"
          variant="outlined"
          label="Cliente"
          hint="Selecione o cliente desejado"
          persistent-hint
          clearable
        ></v-select>

        <v-select 
          class="mb-4"
          variant="outlined"
          label="Produto"
          hint="Selecione o produto desejado"
          persistent-hint
          clearable
        ></v-select>
      </v-col>

      <v-row class="pa-4 d-flex justify-end align-end">
        <v-btn 
          width="150" 
          class="mr-4" 
          color="red-darken-4"
          @click="showModalCancel = true"
        >Cancelar</v-btn>

        <v-btn 
          width="150" 
          color="indigo-accent-4"
          @click="showModalConfirm = true"
        >Confirmar</v-btn>
      </v-row>
    </v-card>
  </div>
</template> 

<style scoped>
.container{
  margin: auto;
}
.title{
  font-weight: 600;
  color: #1E319E;
  font-size: 25px;
}
</style>