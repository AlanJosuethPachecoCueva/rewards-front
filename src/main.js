import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import router from "./router";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"
// Iconos bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"

// vueSweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Importa los estilos de vue-multiselect
import 'vue-multiselect/dist/vue-multiselect.css';

// i18n
import { createI18n } from 'vue-i18n';
import dictionary from './dictionary';

const i18n = createI18n({
    messages: dictionary,
    fallbackFormat: 'en',
    locale: navigator.language.startsWith('es') ? 'es' : 'en'
})

const app = createApp(App).use(i18n)

app.use(VueSweetalert2);
app.use(router)
app.use(createPinia())
// Registrar bootstrap-vue-3
app.use(bootstrap);

// Registrar el service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

app.mount('#app')
