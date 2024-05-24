import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import router from "./router";

// Boostrap
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"
//Iconos bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"


//vueSweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import { mdiAccount } from '@mdi/js'
import './assets/base.css';
import { createI18n } from 'vue-i18n';
import dictionary from './dictionary';

<<<<<<< HEAD
const i18n = createI18n({
    messages: dictionary, 
    fallbackFormat: 'en',
    locale: navigator.language.startsWith('es') ? 'en' : 'en'
})

const app = createApp(App).use(i18n)
=======
import 'vue-multiselect/dist/vue-multiselect.css'; // Importa los estilos aquí
>>>>>>> c1c6c137752494ee5004454551bc0ae99d881cb0

app.use(VueSweetalert2);

app.use(router)
app.use(createPinia())
// Registrar bootstrap-vue-3
app.use(bootstrap);

app.mount('#app')
