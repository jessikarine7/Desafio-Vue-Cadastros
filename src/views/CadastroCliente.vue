<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { createClientes  } from '@/services/clientes';
  import { getProdutos } from '@/services/produtos';
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

  const handleConfirm = async () => {
    const novoCliente = {
      nome: nome.value,
      cpf: cpf.value,
      telefone: telefone.value,
      email: email.value,
      produto: produtoSelecao.value?.map((p) => p.id),
      status: switchStatus.value,
    };

    try {
      await createClientes(novoCliente);
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
    const produtosRes = await getProdutos();
    produtos.value = produtosRes.map((item) => ({ title: item.nome, id: item.id }))
  });
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
      class="pa-6 cardContainer" 
      color="white" 
      min-width="500" 
      height="70%"
    >
      <p class="pa-6 d-flex justify-center title">
        Cadastro de Clientes
      </p>
    
      <v-form>
        <v-text-field
          v-model="nome" 
          class="mb-4"
          variant="outlined"
          label="Nome"
          persistent-hint
          clearable
          hint="Digite seu nome completo sem acentos"
        ></v-text-field>
  
        <v-text-field
          v-model="cpf" 
          class="mb-4"
          variant="outlined"
          label="CPF"
          persistent-hint
          clearable
          hint="Digite seu CPF, sem caracteres especiais"
        ></v-text-field>
  
        <v-text-field
          v-model="telefone" 
          class="mb-4"
          variant="outlined"
          label="Telefone"
          persistent-hint
          clearable
          hint="Digite seu telefone, com ddd"
        ></v-text-field>
  
        <v-text-field
          v-model="email" 
          class="mb-4"
          variant="outlined"
          label="Email"
          persistent-hint
          clearable
          hint="Digite seu e-mail, o mais utilizado"
        ></v-text-field>
  
        <v-select 
          v-model="produtoSelecao" 
          :items="produtos"
          :value="produtos.id"
          item-value="id"
          class="mb-4"
          variant="outlined"
          label="Produto"
          return-object
          clearable
          multiple
          chips
          persistent-hint
          hint="Selecione o produto desejado"
        ></v-select>
   
        <v-switch
          v-model="switchStatus"
          :label="`Status: ${statusLabel}`"
          color="indigo-accent-4"
          hide-details
          inset
          clearable
        ></v-switch>
  
        <v-row class="mt-10 px-4 d-flex justify-end">
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
      </v-form>
    </v-card>
  </div>
</template> 

<style lang="scss" scoped>
  @media (max-width:1700px){

    .cardContainer{
      min-height: 650px;
    }
  }
  .container{
    margin: auto;
  }
  .title{
    font-weight: 600;
    color: #1E319E;
    font-size: 25px;
  }
</style>