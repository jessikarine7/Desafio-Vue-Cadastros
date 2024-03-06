<script setup>
  import { ref, onMounted } from 'vue';
  import { getProdutos } from '../services/produtos';
  import ModalEdit from '../components/ModalEditProdutos.vue';
  import PesquisarTabela from '../components/PesquisarTabela.vue';
  import AlerSucess from '../components/AlertSucess.vue';

  const itemsTab = ref([]);
  const search = ref('');
  const showModalEdit = ref(false);
  const editItem = ref(null);
  const AlertSucess = ref(false);

  const getStatusString = (status) => {
    return status ? 'Ativo' : 'Inativo';
  };

  const openEditModal = (item) => {
    editItem.value = { ...item };
    showModalEdit.value = true;
  };

  const handleUpdateData = () => {
    getItems();

    AlertSucess.value= true;
    setTimeout(() => {
      AlertSucess.value= false;
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
  <div class="d-flex flex-column pa-6 mr-12" style="width: 100%">
    <AlerSucess
      v-model="AlertSucess" 
      title="Seus dados foram atualizados com sucesso!" 
    />

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
            <td>{{ item.Nome }}</td>
            <td>{{ item.Quantidade }}</td>
            <td>{{ getStatusString(item.Status) }}</td>

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
</style>../services/produtos../components/ModalEditProdutos.vue