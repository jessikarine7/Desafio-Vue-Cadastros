<script setup>
import { ref, computed } from 'vue';
import { updateProduto, getById } from '../services/produtos';

const emit = defineEmits(['update:modelValue']);
defineProps(['modelValue']);

const emitCloseModal = () => {
  emit('update:modelValue');
};

const switchStatus = ref(false);
const statusLabel = computed(() => switchStatus.value ? 'Ativo' : 'Inativo');

const saveChanges = () => {
  updateProduto(editItem.value.id)
    .then(() => {
      getItems();

    })
    .catch((error) => {
      console.error('Erro ao salvar alterações:', error);
    });
};
</script>

<template>
  <v-dialog
    :modelValue="modelValue"
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
          @click="emitCloseModal"
        >Cancelar</v-btn>
  
        <v-btn
          width="150" 
          color="indigo-accent-4"
          :to="{name: 'home'}"
          @click="saveChanges"
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