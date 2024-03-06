<script setup>
import { ref, defineProps } from 'vue';

const AlertSucess = ref(true);
defineProps({ title: String });

</script>

<template>
  <v-alert
    v-model="AlertSucess"
    max-height="50"
    type="success"
    density="compact"
    class="alert"
    variant="flat"
  >{{ title }}</v-alert>
</template> 

<style lang="scss" scoped>
.alert{
  font-size: 18px;
}
</style>