<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { createClient  } from '@/services/clients';
  import { getProdutos } from '@/services/produtos';
  import AlertCancel from '@/components/AlertCancel.vue';
  import AlertConfirm from '@/components/AlertConfirm.vue';
  import AlertMessage from '@/components/AlertMessage.vue';
  import { useMask } from '@/composables/useMask';

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

  <v-card 
    class="pa-6 container  elevation-2" 
    color="white" 
  >
    <p class="mt-2 mb-4 d-flex justify-center title">
      Cadastro de Clientes
    </p>
  
    <v-form class="form">
      <v-text-field
        v-model="nome" 
        class="input"
        variant="outlined"
        label="Nome"
        persistent-hint
        clearable
        hint="Digite seu nome completo sem acentos"
      ></v-text-field>

      <!-- <input type="text"         v-maska
        data-maska="#-#"> -->

      <v-text-field
        v-model="cpf" 
        v-maska:[optionsCpf]
        class="input"
        variant="outlined"
        label="CPF"
        persistent-hint
        clearable
        hint="Digite seu CPF, sem caracteres especiais"
      ></v-text-field>

      <v-text-field
        v-model="email" 
        class="input"
        variant="outlined"
        label="Email"
        persistent-hint
        clearable
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
        hint="Selecione o produto desejado"
      ></v-select>
 
      <v-switch
        v-model="switchStatus"
        :label="`Status: ${statusLabel}`"
        color="indigo-accent-4"
        class="input"
        hide-details
        inset
        clearable
      ></v-switch>

      <v-row class="pa-3 btn">
        <v-btn 
          width="150" 
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
  <div class="">
  </div>
</template> 

<style lang="scss" scoped>
  .btn{
    margin-top: 15px;
    display: flex;
    justify-content: end;
    gap: 10px;
  }
  .container{
    width: 30%;
    box-sizing: border-box; 
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title{
    font-weight: 600;
    color: #1E319E;
    font-size: 25px;
  }
  .input{
    margin-bottom: 12px;
  }
  @media (max-width: 1280px) {
    .container {
      min-width: 270px;
      width: auto; 
    }
    .title{
      font-size: 22px;
    }
    .btn{
      gap:10px;
    }
  }
  @media (max-width: 500px) {
    .container {
      min-width: 80%;
      width: auto; 
      margin: 15px;
      padding: 10px;
    }
    .title{
      font-size: 18px;
      margin-top: 10px;
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
</style>