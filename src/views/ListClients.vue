<script setup>
  import { ref, onMounted } from 'vue';
  import { getClient  } from '@/services/clients';
  import { useMask } from '@/composables/useMask';
  import ModalEditClient from '@/components/ModalEditClient.vue';
  import SearchTable from '@/components/SearchTable.vue';
  import AlertMessage from '@/components/AlertMessage.vue';

  const itemsTab = ref([]);
  const search = ref('');
  const showModalEdit = ref(false);
  const editItem = ref(null);
  const showAlertMessage = ref(false);
  const alertType = ref('success');
  const alertMessage = ref('');
  const { addMask } = useMask();

  const headers = ref([
    { title: 'Id', key: 'id' },
    { title: 'Nome', key: 'nome' },
    { title: 'CPF', key: 'cpf' },
    { title: 'E-mail', key: 'email' },
    { title: 'Telefone', key: 'telefone' },
    { title: 'Status', key: 'status' },
    { title: 'Produtos', key: 'nomesProdutos' },
    { title: 'Ações', key: '' },
  ]);
  
  const getStatusString = (status) => {
    return status ? 'Ativo' : 'Inativo';
  };

  const openEditModal = (item) => {
    editItem.value = item;
    showModalEdit.value = true;
  };

  const getItems = async () => {
    try {
      const response = await getClient();
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
  };

  onMounted(() => {
    getItems();
  });
</script>

<template>
  <AlertMessage
    v-if="showAlertMessage"
    :type="alertType"
    :title="alertMessage" 
  />

  <div class="d-flex flex-column container w-100">
    <ModalEditClient
      v-if="showModalEdit"
      v-model="showModalEdit" 
      :edit-data="editItem" 
      @update-data="handleUpdateData"
      @update-error="handleUpdateError"
    />

    <SearchTable 
      @search="search = $event" 
      title="Listagem Clientes"
      class="pesquisa"
    />
  
    <v-data-table 
      class="elevation-5 readonly-8 table"
      hover
      :items="itemsTab" 
      :search="search"
      :headers="headers"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id || '-' }}</td>
          <td>{{ item.nome || '-' }}</td>
          <td>{{ addMask('cpf', item.cpf) || '-' }}</td>
          <td>{{ item.email || '-' }}</td>
          <td>{{ addMask('telefone', item.telefone) || '-' }}</td>
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
  </div>
</template>

<style lang="scss" scoped>
  @media (max-width:700px) {
    .table{
      margin-top: 10px;  
    }
    .pesquisa{
      margin-bottom: 1px;
    }
  }
  @media(max-width:550px){
    .pesquisa{
      display: flex;
      flex-wrap: wrap;
    }
    .table{
      margin-bottom: 70px;
    }
  }
  @media (min-width:380px) {
    .table{
      margin-top: 43px;
    }
  }
  .container{
    padding: 20px;
    margin-top: 20px;
  }
  .pesquisa{
    margin-bottom: 5px;
  }
  .table{
    min-height: 90%;
    margin-top: 10px;
    padding: 15px;
  }
  .v-row {
    max-height: 90px;
  }
  :v-deep(.v-row){
    flex: 0px;
    margin: 0px;
  }
</style>