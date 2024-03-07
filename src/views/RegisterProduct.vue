<script setup>
  import { ref, computed } from 'vue';
  import { createProduct  } from '@/services/products';
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
      await createProduct(novoProduto);
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
  };
</script>

<template>
  <AlertMessage
    v-if="showAlertMessage"
    :type="alertType"
    title="Produto registrado com sucesso!" 
  />

  <AlertCancel 
    v-model="showAlertCancel"
  />

  <AlertConfirm 
    v-model="showModalConfirm" 
    @confirm="handleConfirm"
  />
 
  <v-card 
    class="pa-6 container elevation-2" 
    color="white" 
  >
    <p class="mt-2 mb-2 title">
      Cadastro de Produtos
    </p>

    <v-form>
      <v-text-field 
        v-model="nome"
        class="input"
        variant="outlined"
        label="Nome"
        density="compact"
        hint="Digite seu nome completo sem acentos"
        persistent-hint
        clearable
      ></v-text-field>

      <v-text-field 
        v-model="quantidade"
        class="input"
        variant="outlined"
        label="Quantidade"
        type="number"
        density="compact"
        hint="Digite números, não pode informar letras"
        persistent-hint
        clearable
      ></v-text-field>

      <v-switch
        :label="`Status: ${statusLabel}`"
        v-model="switchStatus"
        color="indigo-accent-4"
        hide-details
        clearable
        density="compact"
      ></v-switch>

      <v-row class="pa-3 btn">
        <v-btn 
          width="120" 
          size="small"
          color="red-darken-4"
          @click="openAlertCancel"
        >Cancelar</v-btn>

        <v-btn 
          width="120" 
          size="small"
          color="indigo-accent-4"
          @click="openAlertConfirm"
        >Confirmar</v-btn>
      </v-row>
    </v-form>
  </v-card>
</template> 

<style lang="scss" scoped>
  @media (max-width: 1280px) {
    .container {
      min-width: 270px;
      width: auto; 
      padding: 10px;
    }
    .title{
      font-size: 22px;
    }
    .btn{
      gap:10px;
    }
  }
  @media (max-width: 800px) {
    .container {
      min-width: 80%;
      width: auto; 
      margin: 44px;
      padding: 10px;
    }
    .title{
      font-size: 18px;
      padding-top: 14px;
      margin-bottom: 10px;
    }
    .btn{
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
      gap:10px;
      margin-bottom: 4px;
    }
    .input{
      margin-bottom: 8px;
    }
    :deep(.v-input__details){
      min-height: 5px;
      display: none;
    }
  }
  @media (max-width: 300px) {
    .container {
      margin-right: 20px;
      margin-left: 10px;
    }
  }
  .btn{
    margin-top: 30%;
    gap: 10px;
    display: flex;
    justify-content: end;
  }
  .input{
    margin-bottom: 20px;
  }
  .container{
    width: 30%;
    gap: 8%;
    box-sizing: border-box; 
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-block-start: inherit;
    margin-top: 38px;
  }
  .title{
    font-weight: 600;
    color: #1E319E;
    font-size: 18px;
    display: flex;
    justify-content: center;
  }
</style>