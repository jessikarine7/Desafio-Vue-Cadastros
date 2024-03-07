<script setup>
  import { ref, defineProps } from 'vue';

  const alertType = ref('success'); 
  const props = defineProps({title: String, type: String});

</script>

<template>
  <div class="d-flex justify-start order-1">
    <v-alert
      max-height="50"
      :type="alertType"
      density="compact"
      class="alert"
      variant="flat"
      position="absolute"
    >
      {{ title }}
    </v-alert>
  </div>
</template> 

<style lang="scss" scoped>
.alert{
  font-size: 18px;
  right: 10px;
}
</style>