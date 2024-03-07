<script setup>
  import { ref, onMounted } from 'vue';
  import { getClientes  } from '@/services/clientes';
  import ModalEditClientes from '@/components/ModalEditClientes.vue';
  import PesquisarTabela from '@/components/PesquisarTabela.vue';
  import AlertMessage from '@/components/AlertMessage.vue';

  const itemsTab = ref([]);
  const search = ref('');
  const showModalEdit = ref(false);
  const editItem = ref(null);
  const showAlertMessage = ref(false);
  const alertType = ref('success');
  const alertMessage = ref('');
  
  const getStatusString = (status) => {
    return status ? 'Ativo' : 'Inativo';
  };

  const openEditModal = (item) => {
    editItem.value = item;
    showModalEdit.value = true;
  };

  const getItems = async () => {
    try {
      const response = await getClientes();
      itemsTab.value = response;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleUpdateData = async () => {
    await getItems();
    alertMessage.value = 'Seus dados foram atualizados com sucesso!';
    alertType.value = 'success'
    showAlertMessage.value = true;
    setTimeout(() => {
      showAlertMessage.value= false;
    }, 3000);
  };

  const handleUpdateError = () => {
    alertMessage.value = 'Ocorreu um erro tente novamente!';
    alertType.value = 'error'
    showAlertMessage.value = true;
    setTimeout(() => {
      showAlertMessage.value= false;
    }, 3000);
  }

  onMounted(() => {
    getItems();
  });

  const headers = ref([
    { title: 'Id', key: 'id' },
    { title: 'Nome', key: 'nome' },
    { title: 'CPF', key: 'cpf' },
    { title: 'E-mail', key: 'email' },
    { title: 'Telefone', key: 'telefone' },
    { title: 'Status', key: 'status' },
    { title: 'Produtos', key: 'nomesProdutos' },
    { title: 'Ações', key: '' },
  ])
</script>

<template>
  <AlertMessage
    v-if="showAlertMessage"
    :type="alertType"
    :title="alertMessage" 
  />

  <div class="d-flex flex-column pa-6 mt-12 w-100">
    <ModalEditClientes
      v-if="showModalEdit"
      v-model="showModalEdit" 
      :edit-data="editItem" 
      @update-data="handleUpdateData"
      @update-error="handleUpdateError"
    />

    <PesquisarTabela 
      @search="search = $event" 
      title="Listagem Clientes"
    />
  
    <v-card class="readonly-8 d-flex elevation-5">
      <v-data-table 
        class="ma-5" 
        :items="itemsTab" 
        :search="search"
        :headers="headers"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id || '-' }}</td>
            <td>{{ item.nome || '-' }}</td>
            <td>{{ item.cpf || '-' }}</td>
            <td>{{ item.email || '-' }}</td>
            <td>{{ item.telefone || '-' }}</td>
            <td>{{ getStatusString(item.status) || '-'}} </td>

            <td>
              <v-chip 
                v-for="(p, index) in item.produtos" 
                :key="index" 
                class="ma-1"
              >
                {{ p.nome.trim() }}
              </v-chip>
            </td>

            <td @click="openEditModal(item)">
              <v-icon>mdi-pencil</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
  .v-row {
    max-height: 90px;
  }
  .title{
    font-weight: 600;
    color: #1E319E;
    font-size: 25px;
  }
  :v-deep(.v-row){
    flex: 0px;
    margin: 0px;
  }
</style>