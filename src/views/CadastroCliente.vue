<script setup>
  // import { VueMaskDirective } from 'v-mask'
  import { ref, computed } from 'vue'
  import ModalCancelar from '../components/ModalCancelar.vue'
  import ModalConfirmar from '../components/ModalConfirmar.vue'

  const switchStatus = ref(false)
  const statusLabel = computed(() => switchStatus.value ? 'Ativo' : 'Inativo')
  const showModalCancel = ref(false);
  const showModalConfirm = ref(false);

  // const inputName = ref({ name: '' });
  // const updateInputName = (event) => {
  //   inputName.value.name = event.target.value;
  // }
</script>

<template>
  <div class="container d-flex justify-center elevation-2">
    <ModalCancelar v-if="showModalCancel" @close="showModalCancel = false" />
    <ModalConfirmar v-if="showModalConfirm" @close="showModalConfirm = false" />

    <v-card 
      class="pa-6" 
      color="white" 
      min-width="500" 
      height="670"
    >
      <p class="pa-6 d-flex justify-center title"
      >Cadastro de Clientes</p>

      <v-text-field 
        class="mb-4"
        variant="outlined"
        label="Nome"
        hint="Digite seu nome completo sem acentos"
        persistent-hint
        clearable
      ></v-text-field>

      <v-text-field
        class="mb-4"
        variant="outlined"
        label="CPF"
        hint="Digite seu CPF, sem caracteres especiais"
        persistent-hint
        clearable
      ></v-text-field>

      <v-text-field
        class="mb-4"
        variant="outlined"
        label="Telefone"
        hint="Digite seu telefone, com ddd"
        persistent-hint
        clearable
      ></v-text-field>

      <v-text-field
        class="mb-4"
        variant="outlined"
        label="Email"
        hint="Digite seu e-mail, o mais utilizado"
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

      <v-row class="mt-14 px-4 d-flex justify-end">
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


