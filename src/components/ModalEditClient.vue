<script setup>
  import { defineProps, defineEmits, toRef, ref, onMounted } from 'vue';
  import { updateClient } from '@/services/clients';
  import { getProducts } from '@/services/products';
  import { useMask } from '@/composables/useMask';

  const emit = defineEmits(['update:modelValue', 'updateData']);
  const props = defineProps(['modelValue', 'editData']);
  const { unmask, optionsCpf, optionsTelefone } = useMask();
  const produtosSelecao = ref([]);
  const produtosItens = ref([]);
  const cliente = toRef(() => props.editData);

  const emitCloseModal = () => {
    emit('update:modelValue', false);
  };

  const confirmEdit = async () => {
    cliente.value.produto = produtosSelecao.value.map((p) => p.id);
    delete cliente.value.produtos;
    
    try {
      const itemId = cliente.value.id;
      await updateClient(itemId, cliente.value);
      emit('update-data');
    } catch (error) {
      console.error('Erro na atualização:', error);
      emit('update-error');
    }
    emitCloseModal();
  };

  onMounted(async () => {
    produtosItens.value = await getProducts();
    produtosSelecao.value = produtosItens.value.filter((p) => 
      cliente.value.produto.includes(p.id)
    );
  });
</script>

<template>
  <v-dialog
    :modelValue="modelValue"
    class="dialog"
  >
    <v-card class="d-flex pa-4">
      <p class="title">Modal Editar</p>

      <v-form class="mt-3 form">
        <v-text-field 
          v-model="cliente.nome"
          label="Nome"
          variant="outlined"
          clearable 
          hide-details
          density="compact"
          class="input"
        ></v-text-field>

        <v-text-field 
          v-model="cliente.cpf"
          v-maska:[optionsCpf]
          label="Cpf"
          variant="outlined"
          clearable
          hide-details
          density="compact"
          class="input"
        ></v-text-field>

        <v-text-field 
          v-model="cliente.email"
          variant="outlined"
          label="E-mail"
          clearable
          hide-details
          density="compact"
          class="input"
        ></v-text-field>

        <v-text-field 
          v-model="cliente.telefone"
          v-maska:[optionsTelefone]
          variant="outlined"
          label="Telefone"
          clearable
          hide-details
          density="compact"
          class="input"
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
          hide-details
          density="compact"
          class="input"
        >
        </v-select>

        <v-switch
          :label="cliente.status ? 'Ativo' : 'Inativo'"
          :color="cliente.status ? 'indigo-accent-4' : 'grey'"
          v-model="cliente.status"
          hide-details
          clearable
          density="compact"
        ></v-switch>
      </v-form>

      <v-row class="pb-1 btn">
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
    .btn{
      flex-wrap: wrap;
    }
  }
  @media (max-width:300px) {
    .dialog{
      min-width: 280px;
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
    width: 40%;
    box-sizing: border-box; 
  }
  .title{
    font-weight: 700;
    font-size: 15px;
    text-align: center;
  }
  .input{
    margin-bottom: 20px;
  }
</style>