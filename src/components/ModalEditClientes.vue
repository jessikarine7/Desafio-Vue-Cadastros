<script setup>
import { defineProps, defineEmits, toRef, ref, onMounted } from 'vue';
import { updateClientes } from '../services/clientes';
import { getProdutos } from '@/services/produtos';

const emit = defineEmits(['update:modelValue', 'updateData']);
const props = defineProps(['modelValue', 'editData']);

const emitCloseModal = () => {
  emit('update:modelValue');
};

const cliente = toRef(() => props.editData);

const produtosSelecao = ref([]);
const produtosItens = ref([]);

onMounted(async () => {
  produtosItens.value = await getProdutos();
  produtosSelecao.value = [...cliente.value.produto]
})

const confirmEdit = async () => {
  cliente.value.produto = produtosSelecao.value.map((p) => p.id);
  delete cliente.value.produtos
  console.log(cliente.value)
  return

  try {
    const itemId = cliente.value.id;
    await updateClientes(itemId, cliente.value);
    emit('updateData');
  } catch (error) {
    console.error('Erro na atualização:', error);
  }
  emitCloseModal();
};
</script>

<template>
  <v-dialog
    :modelValue="modelValue"
    width="800"
    height="800"
  >
    <v-card class="d-flex pa-8">
      <p class="titulo">Modal Editar</p>

      <v-form class="mt-6">
        <v-text-field 
          v-model="cliente.nome"
          label="Nome"
          variant="outlined"
          clearable 
          hint="Digite seu nome completo"
          persistent-hint
          class="mb-5"
        ></v-text-field>

        <v-text-field 
          v-model="cliente.cpf"
          variant="outlined"
          label="Cpf"
          clearable
          hint="Digite seu cpf sem dígitos"
          persistent-hint
          class="mb-5"
        ></v-text-field>

        <v-text-field 
          v-model="cliente.email"
          variant="outlined"
          label="E-mail"
          clearable
          hint="Digite seu email mais utilizado"
          persistent-hint
          class="mb-5"
        ></v-text-field>

        <v-text-field 
          v-model="cliente.telefone"
          variant="outlined"
          label="Telefone"
          clearable
          hint="Digite seu telefone com o ddd"
          persistent-hint
          class="mb-5"
        ></v-text-field>
         
        <v-select
          v-model="produtosSelecao"
          :items="produtosItens"
          chips
          return-object
          variant="outlined"
          item-title="nome"
          item-value="id"
          label="Produtos"
          clearable
          multiple
          hint="Selecione os produtos do seu cliente"
          persistent-hint
          class="mb-5"
        >
        </v-select>

        <v-switch
          :label="cliente.status ? 'Ativo' : 'Inativo'"
          :color="cliente.status ? 'indigo-accent-4' : 'grey'"
          v-model="cliente.status"
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
</style>