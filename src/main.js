import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";

// Boostrap
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"
//Iconos bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"
const app = createApp(App)

//vueSweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import { mdiAccount } from '@mdi/js'

app.use(VueSweetalert2);

app.use(router)
// Registrar bootstrap-vue-3
app.use(bootstrap);

app.mount('#app')
