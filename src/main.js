import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { vMaska } from "maska";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  iconfont: 'mdi' 
});

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.directive("maska", vMaska);
app.mount('#app');
