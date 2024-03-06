<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({ title: String })

const search = ref()
const emit = defineEmits(['search'])

const emitSearch = (value) => {
  emit('search', value)
}

</script>

<template>
  <v-row class="d-flex align-center row px-4">
    <p class="mr-4 title">{{ title }}</p>

    <v-spacer></v-spacer>
    
    <v-text-field
      v-model="search"
      @update:model-value="emitSearch"
      density="compact"
      label="Pesquisar"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      clearable
      hide-details
    ></v-text-field>
  </v-row>
</template>

<style scoped>
.title {
  font-weight: 600;
  color: #1E319E;
  font-size: 25px;
}
</style>