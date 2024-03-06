<script setup>
  import { ref, computed } from 'vue'
  import AlertCancelar from '../components/AlertCancelar.vue'
  import AlertConfirmar from '../components/AlertConfirmar.vue'

  const switchStatus = ref(false)
  const statusLabel = computed(() => switchStatus.value ? 'Ativo' : 'Inativo')
  const showModalCancel = ref(false)
  const showModalConfirm = ref(false)
</script>

<template>
  <div class="container d-flex justify-center elevation-2">
    <AlertCancelar v-if="showModalCancel" @close="showModalCancel = false" />
    <AlertConfirmar v-if="showModalConfirm" @close="showModalConfirm = false" />

    <v-card 
      class="pa-4 d-flex justify-space-between flex-column" 
      color="white" 
      min-width="500" 
      height="670"
    >
      <v-col>
        <p class="pa-4 d-flex justify-center title"
        >Cadastro de Produtos</p>
  
        <v-text-field 
          class="mb-4"
          variant="outlined"
          label="Nome"
          hint="Digite seu nome completo sem acentos"
          persistent-hint
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
../components/AlertCancelar.vue../components/AlertConfirmar.vue