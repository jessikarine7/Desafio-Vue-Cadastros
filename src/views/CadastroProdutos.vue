<script setup>
  import { ref, computed } from 'vue';
  import { createProduto  } from '@/services/produtos';
  import AlertCancel from '@/components/AlertCancel.vue';
  import AlertConfirm from '@/components/AlertConfirm.vue';
  import AlertMessage from '@/components/AlertMessage.vue';

  const switchStatus = ref(false);
  const statusLabel = computed(() => switchStatus.value ? 'Ativo' : 'Inativo')
  const showAlertCancel = ref(false);
  const showModalConfirm = ref(false);
  const showAlertMessage = ref(false);
  const alertType = ref('success');
  const nome = ref('');
  const quantidade = ref('');

  const openAlertCancel= () => {
    showAlertCancel.value = true;
  };
  const openAlertConfirm= () => {
    showModalConfirm.value = true;
  };

  const handleConfirm = async () => {
    const novoProduto = {
      nome: nome.value,
      quantidade: quantidade.value,
      status: switchStatus.value,
    };

    try {
      await createProduto(novoProduto);
      nome.value = '';
      quantidade.value = '';
      switchStatus.value = false;

      showModalConfirm.value = false;
      showAlertMessage.value= true;
      setTimeout(() => {
        showAlertMessage.value= false;
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  }
</script>

<template>
  <AlertMessage
    v-if="showAlertMessage"
    :type="alertType"
    title="Seus dados foram atualizados com sucesso!" 
  />

  <AlertCancel 
    v-model="showAlertCancel"
  />

  <AlertConfirm 
    v-model="showModalConfirm" 
    @confirm="handleConfirm"
  />

  <div class="container d-flex justify-center elevation-2">
    <v-card 
      class="pa-4 d-flex justify-space-between flex-column" 
      color="white" 
      min-width="500" 
      height="750"
    >
      <v-col>
        <p class="pa-4 d-flex justify-center title"
        >Cadastro de Produtos</p>
  
        <v-text-field 
          v-model="nome"
          class="mb-4"
          variant="outlined"
          label="Nome"
          hint="Digite seu nome completo sem acentos"
          persistent-hint
          clearable
        ></v-text-field>

        <v-text-field 
          v-model="quantidade"
          class="mb-4"
          variant="outlined"
          label="Quantidade"
          hint="Digite números, não pode informar letras"
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
          @click="openAlertCancel"
        >Cancelar</v-btn>

        <v-btn 
          width="150" 
          color="indigo-accent-4"
          @click="openAlertConfirm"
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