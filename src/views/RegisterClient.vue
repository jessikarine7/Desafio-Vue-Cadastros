<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { createClient  } from '@/services/clients';
  import { getProducts } from '@/services/products';
  import { useMask } from '@/composables/useMask';
  import AlertCancel from '@/components/AlertCancel.vue';
  import AlertConfirm from '@/components/AlertConfirm.vue';
  import AlertMessage from '@/components/AlertMessage.vue';

  const switchStatus = ref(false);
  const showAlertCancel = ref(false);
  const showModalConfirm = ref(false);
  const showAlertMessage = ref(false);
  const alertType = ref('success');
  const nome = ref('');
  const cpf = ref('');
  const telefone = ref('');
  const email = ref('');
  const produtoSelecao = ref(null);
  const produtos = ref([]);

  const statusLabel = computed(() => 
    switchStatus.value ? 'Ativo' : 'Inativo'
  );

  const openAlertCancel= () => {
    showAlertCancel.value = true;
  };

  const openAlertConfirm= () => {
    showModalConfirm.value = true;
  };

  const { unmask, optionsCpf, optionsTelefone } = useMask();

  const handleConfirm = async () => {
    const novoCliente = {
      nome: nome.value,
      cpf: unmask('cpf', cpf.value),
      telefone: unmask('telefone', telefone.value),
      email: email.value,
      produto: produtoSelecao.value?.map((p) => p.id),
      status: switchStatus.value,
    };

    try {
      await createClient(novoCliente);
      nome.value = '';
      cpf.value = '';
      telefone.value = '';
      email.value = '';
      produtoSelecao.value = null;
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

  onMounted(async () => {
    const produtosRes = await getProducts();
    produtos.value = produtosRes.map((item) => 
      ({ title: item.nome, id: item.id })
    );
  });
</script>

<template>
  <AlertMessage
    v-if="showAlertMessage"
    :type="alertType"
    title="Cliente registrado com sucesso!" 
  />

  <AlertCancel 
    v-model="showAlertCancel"
  />

  <AlertConfirm 
    v-model="showModalConfirm" 
    @confirm="handleConfirm"
  />

  <v-card class="pa-5 container elevation-2">
    <v-form class="form" color="white" >
      <p class="mb-2 d-flex justify-center title">
        Cadastro de Clientes
      </p>
      <v-text-field
        v-model="nome" 
        class="input"
        variant="outlined"
        label="Nome"
        persistent-hint
        clearable
        density="compact"
        hint="Digite seu nome completo sem acentos"
      ></v-text-field>
  
      <v-text-field
        v-model="cpf" 
        v-maska:[optionsCpf]
        class="input"
        variant="outlined"
        label="CPF"
        persistent-hint
        clearable
        density="compact"
        hint="Digite seu CPF, sem caracteres especiais"
      ></v-text-field>
  
      <v-text-field
        v-model="email" 
        class="input"
        variant="outlined"
        label="Email"
        persistent-hint
        clearable
        density="compact"
        hint="Digite seu e-mail, o mais utilizado"
      ></v-text-field>
  
      <v-text-field
        v-model="telefone" 
        v-maska:[optionsTelefone]
        class="input"
        variant="outlined"
        label="Telefone"
        persistent-hint
        clearable
        density="compact"
        hint="Digite seu telefone, com ddd"
      ></v-text-field>
  
      <v-select 
        v-model="produtoSelecao" 
        :items="produtos"
        :value="produtos.id"
        item-value="id"
        class="input"
        variant="outlined"
        label="Produto"
        return-object
        clearable
        multiple
        chips
        persistent-hint
        density="compact"
        hint="Selecione o produto desejado"
      ></v-select>
  
      <v-switch
        v-model="switchStatus"
        :label="`Status: ${statusLabel}`"
        color="indigo-accent-4"
        class="input"
        hide-details
        clearable
        density="compact"
      ></v-switch>
  
      <v-row class="pa-1 btn">
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
      min-width: 25%;
      width: auto; 
    }
    .title{
      font-size: 20px;
    }
    .btn{
      gap:10px;
    }
  }
  @media (max-width: 800px) {
    .container {
      min-width: 80%;
      width: auto; 
      margin: 15px;
      padding: 30px;
      margin-top: 50px;
    }
    .title{
      font-size: 18px;
      padding-top: 20px 
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
  @media(max-width:300px){
    .container{
      height: 97%;
    }
  }
  .btn{
    margin-top: 2px;
    display: flex;
    justify-content: end;
    gap: 10px;
  }
  .container{
    background-color: white;
    width: 30%;
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
  }
  .input{
    margin-bottom: 4px;
  }
</style>