<script setup>
  import { defineProps, defineEmits } from 'vue';
  import { updateProduct } from '@/services/products';

  const emit = defineEmits(['update:modelValue', 'updateData']);
  const props = defineProps(['modelValue', 'editData']);

  const emitCloseModal = () => {
    emit('update:modelValue');
  };

  const confirmEdit = async () => {
    console.log(props.editData.id);
    try {
      const itemId = props.editData.id;
      await updateProduct(itemId, props.editData);
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
    class="dialog"
  >
    <v-card class="d-flex pa-6">
      <p class="title">Modal Editar</p>

      <v-form class="mt-6">
        <v-text-field 
          v-model="editData.nome"
          label="Nome"
          variant="outlined"
          clearable 
          hint="Digite seu nome completo"
          persistent-hint
          class="mb-5"
          density="compact"
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
          density="compact"
        ></v-text-field>

        <v-switch
          :label="editData.status ? 'Ativo' : 'Inativo'"
          :color="editData.status ? 'indigo-accent-4' : 'grey'"
          v-model="editData.status"
          hide-details
          clearable
          density="compact"
        ></v-switch>
      </v-form>

      <v-row class="pa-3 btn">
        <v-btn
          width="120" 
          size="small"
          color="red-darken-4"
          @click="emitCloseModal"
        >Cancelar</v-btn>
  
        <v-btn
          width="120" 
          size="small"
          color="indigo-accent-4"
          @click="confirmEdit"
        >Confirmar</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template> 

<style lang="scss" scoped>
  @media (max-width:800px) {
    .dialog{
      min-width: 350px;
    }
    :deep(.v-input__details){
      min-height: 5px;
      display: none;
    }
    .btn{
      flex-wrap: wrap;
    }
  }
  @media (max-width:300px) {
    .dialog{
      min-width: 280px;
    }
    :deep(.v-input__details){
      min-height: 5px;
      display: none;
    }
    .btn{
      flex-wrap: wrap;
    }
  }
  .btn{
    margin-top: 2px;
    gap: 5px;
    display: flex;
    justify-content: center;
  }
  .dialog{
    width: 45%;
    box-sizing: border-box; 
  }
  .title{
    font-weight: 700;
    font-size: 15px;
    text-align: center;
  }
  .titulo{
    font-weight: 300;
    font-size: 20px;
  }
</style>