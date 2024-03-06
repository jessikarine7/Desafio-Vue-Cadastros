<script setup>
  import { ref, onMounted } from 'vue';
  import { getProdutos } from '@/services/produtos';
  import ModalEdit from '@/components/ModalEditProdutos.vue';
  import PesquisarTabela from '@/components/PesquisarTabela.vue';
  import AlertMessage from '@/components/AlertMessage.vue';

  const itemsTab = ref([]);
  const search = ref('');
  const showModalEdit = ref(false);
  const editItem = ref(null);
  const showAlertMessage = ref(false);
  const alertType = ref('success');

  const getStatusString = (status) => {
    return status ? 'Ativo' : 'Inativo';
  };

  const openEditModal = (item) => {
    editItem.value = { ...item };
    showModalEdit.value = true;
  };

  const handleUpdateData = () => {
    getItems();

    showAlertMessage.value= true;
    setTimeout(() => {
      showAlertMessage.value= false;
    }, 3000);
  };

  const getItems = async () => {
    try {
      const response = await getProdutos();
      itemsTab.value = response;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  onMounted(() => {
    getItems();
  });
</script>

<template>
  <AlertMessage
    v-if="showAlertMessage"
    :type="alertType"
    title="Seus dados foram atualizados com sucesso!" 
  />
  
  <div class="d-flex flex-column pa-6 mr-12" style="width: 100%">
    <ModalEdit 
      v-model="showModalEdit" 
      :edit-data="editItem" 
      @update-data="handleUpdateData" 
    />

    <PesquisarTabela 
      @search="search = $event" 
      title="Listagem Produtos"
    />

    <v-card class="readonly-8 d-flex elevation-5">
      <v-data-table 
        class="ma-5" 
        :items="itemsTab" 
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.quantidade }}</td>
            <td>{{ getStatusString(item.status) }}</td>

            <td @click="openEditModal(item)">
              <v-icon>mdi-pencil</v-icon>
            </td>

            <!-- <td @click="handleDelete(item.id)">
              <v-icon>mdi-delete</v-icon>
            </td> -->
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