<script setup>
  // import { VueMaskDirective } from 'v-mask'
  import { ref, computed, onMounted } from 'vue';
  import { createClientes  } from '@/services/clientes';
  import { getProdutos } from '@/services/produtos';
  import AlertCancel from '@/components/AlertCancel.vue';
  import AlertConfirm from '@/components/AlertConfirm.vue';
  import AlertMessage from '@/components/AlertMessage.vue';

  const switchStatus = ref(false)
  const statusLabel = computed(() => switchStatus.value ? 'Ativo' : 'Inativo')
  const showAlertCancel = ref(false);
  const showModalConfirm = ref(false);
  const showAlertMessage = ref(false);
  const alertType = ref('success');
  const nome = ref('');
  const cpf = ref('');
  const telefone = ref('');
  const email = ref('');
  const produto = ref('');
  const produtos = ref([]);

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
      produto: produto.value.map((p) =>  p.value),
      status: switchStatus.value,
    };

    try {
      await createClientes(novoCliente);
      nome.value = '';
      cpf.value = '';
      telefone.value = '';
      email.value = '';
      produto.value = '';
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
  produtos.value = await getProdutos();
  console.log(produtos.value);
});
</script>

<template>
  <AlertMessage
    v-if="showAlertMessage"
    :type="alertType"
    title="Seus dados foram atualizados com sucesso!" 
  />

  <div class="container d-flex justify-center elevation-2">
    <AlertCancel 
      v-model="showAlertCancel"
    />
    <AlertConfirm 
      v-model="showModalConfirm" 
      @confirm="handleConfirm"
    />

    <v-card 
      class="pa-6" 
      color="white" 
      min-width="500" 
      height="740"
    >
      <p class="pa-6 d-flex justify-center title"
      >Cadastro de Clientes</p>
    
      <v-form>

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
          v-model="cpf" 
          class="mb-4"
          variant="outlined"
          label="CPF"
          hint="Digite seu CPF, sem caracteres especiais"
          persistent-hint
          clearable
        ></v-text-field>
  
        <v-text-field
          v-model="telefone" 
          class="mb-4"
          variant="outlined"
          label="Telefone"
          hint="Digite seu telefone, com ddd"
          persistent-hint
          clearable
        ></v-text-field>
  
        <v-text-field
          v-model="email" 
          class="mb-4"
          variant="outlined"
          label="Email"
          hint="Digite seu e-mail, o mais utilizado"
          persistent-hint
          clearable
        ></v-text-field>
  
        <v-select 
          v-model="produto" 
          :items="produtos.map(item => ({ title: item.Nome, value: item.id }))"
          return-object
          :value="produtos.id"
          class="mb-4"
          variant="outlined"
          label="Produto"
          hint="Selecione o produto desejado"
          persistent-hint
          clearable
          multiple
          chips
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