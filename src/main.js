import { createApp } from 'vue'
import App from './App.vue'
import VueResource  from 'vue-resource'

const app = createApp(App);
app.use(VueResource);
app.mount('#app');

