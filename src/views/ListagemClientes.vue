<script setup>
  import { ref, onMounted } from 'vue';
  import ModalEdit from '../components/ModalEdit.vue';
  import PesquisarTabela from '../components/PesquisarTabela.vue';
  import { getClientes  } from '../services/clientes';

  const itemsTab = ref([]);
  const search = ref('');
  const showModalEdit = ref(false);

  const getItems = async () => {
    try {
      const response = await getClientes();
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
    <ModalEdit v-if="showModalEdit" @close="showModalEdit = false" />
    <PesquisarTabela @search="search = $event" title="Listagem Clientes"/>

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
            <td>{{ item.Cpf }}</td>
            <td>{{ item.Telefone }}</td>
            <td>{{ item.Email }}</td>
            <td>{{ item.Status }}</td>

            <td>
              <v-chip 
                v-for="(produto, index) in item.Produtos.split(',')" 
                :key="index" 
                class="ma-1"
              >
                {{ produto.trim() }}
              </v-chip>
            </td>

            <td @click="showModalEdit = true">
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