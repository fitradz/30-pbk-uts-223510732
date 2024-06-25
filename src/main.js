import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store'; // Pinia store
import { Quasar, QLayout, QPage, QList } from 'quasar'; // Import komponen Quasar yang Anda perlukan
import 'quasar/dist/quasar.css';

const app = createApp(App);

// Gunakan app (bukan MyApp) untuk menggunakan router, pinia, dan Quasar
app.use(router);
app.use(pinia); // Use Pinia store
app.use(Quasar, { /* quasar options */ });

// Daftarkan komponen-komponen Quasar yang Anda gunakan di aplikasi Anda
app.component('QLayout', QLayout);
app.component('QPage', QPage);
app.component('QList', QList);

// Mount aplikasi Vue Anda
app.mount('#app');
