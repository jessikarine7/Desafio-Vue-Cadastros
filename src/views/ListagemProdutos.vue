<script setup>
  import { ref } from 'vue'
  import ModalEdit from '../components/ModalEdit.vue'
  import PesquisarTabela from '../components/PesquisarTabela.vue'

  const itemsTab = ref([
    { 
      id: '01', 
      Nome: 'Produto X', 
      Quantidade: '10', 
      Status: 'Ativo',
      Editar: '',
    },
    { 
      id: '02', 
      Nome: 'Produto Y', 
      Quantidade: '20', 
      Status: 'Inativo',
      Editar: '',
    }
  ])

  const search = ref('')
  const showModalEdit = ref(false)
</script>

<template>
  <div class="d-flex flex-column pa-6 mr-12" style="width: 100%">
    <ModalEdit v-if="showModalEdit" @close="showModalEdit = false" />
    <PesquisarTabela @search="search = $event" title="Listagem Produtos"/>

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
            <td>{{ item.Status }}</td>

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