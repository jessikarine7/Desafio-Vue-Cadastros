<script setup>
  import { ref } from 'vue'

  const itemsTab = ref([
    { 
      id: '01', 
      Cliente: 'Cliente 01', 
      Status_Cliente: 'Ativo', 
      Produtos: 'Produto Z, Produto W, Produto Y, Produto X'
    },
    { 
      id: '02', 
      Cliente: 'Cliente 02', 
      Status_Cliente: 'Inativo', 
      Produtos: 'Produto X'
    }
  ])
  const search = ref('')
</script>

<template>
  <div class="d-flex flex-column pa-6 mr-12" style="width: 100%">
    <v-row class="d-flex align-center row px-4">
      <p class="mr-4 title">Listagem Geral</p>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Pesquisar"
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
      ></v-text-field>
    </v-row>

    <v-card class="readonly-8 d-flex elevation-5">
      <v-data-table 
        class="ma-5" 
        :items="itemsTab" 
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.Cliente }}</td>
            <td>{{ item.Status_Cliente }}</td>

            <td>
              <v-chip 
                v-for="(produto, index) in item.Produtos.split(',')" 
                :key="index" 
                class="ma-1"
              >
                {{ produto.trim() }}
              </v-chip>
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