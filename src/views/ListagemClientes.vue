<script setup>
  import { ref } from 'vue'
  import ModalEdit from '../components/ModalEdit.vue'
  import PesquisarTabela from '../components/PesquisarTabela.vue'

  const itemsTab = ref([
    { 
      id: '01', 
      Nome: 'Cliente 01', 
      Status: 'Ativo', 
      Produtos: 'Produto Z, Produto W, Produto Y, Produto A',
      Editar: '',
    },
    { 
      id: '02', 
      Nome: 'Cliente 02', 
      Status: 'Inativo', 
      Produtos: 'Produto X',
      Editar: '',
    }
  ])

  const search = ref('')
  const showModalEdit = ref(false)
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