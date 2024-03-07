<script setup>
import { defineProps, defineEmits } from 'vue';
import { updateProduto } from '@/services/products';

const emit = defineEmits(['update:modelValue', 'updateData']);
const props = defineProps(['modelValue', 'editData']);

const emitCloseModal = () => {
  emit('update:modelValue');
};

const confirmEdit = async () => {
  console.log(props.editData.id);
  try {
    const itemId = props.editData.id;
    await updateProduto(itemId, props.editData);
    emit('updateData');
  } catch (error) {
    console.error('Erro na atualização:', error);
    emit('update-error');
  }
  emitCloseModal();
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
          v-model="editData.nome"
          label="Nome"
          variant="outlined"
          clearable 
          hint="Digite seu nome completo"
          persistent-hint
          class="mb-5"
        ></v-text-field>

        <v-text-field 
          v-model="editData.quantidade"
          variant="outlined"
          label="Quantidade"
          type="number"
          clearable
          hint="Digite a quantidade total de produtos"
          persistent-hint
          class="mb-5"
        ></v-text-field>

        <v-switch
          :label="editData.status ? 'Ativo' : 'Inativo'"
          :color="editData.status ? 'indigo-accent-4' : 'grey'"
          v-model="editData.status"
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
          @click="confirmEdit"
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
</style>../services/product