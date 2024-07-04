import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { store, key } from '/src/store/index.ts';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

app.use(router);
app.use(store, key);

app.mount('#app');
