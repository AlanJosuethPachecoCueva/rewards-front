import { createRouter, createWebHistory } from "vue-router";

import home from "./views/home.vue";
import registerComponent from "./components/registerComponent.vue";
import loginComponent from "./components/loginComponent.vue";
import auth from "./views/auth.vue";
import manageKits from "./views/admins/manageKits.vue";
import createKit from "./views/admins/createKit.vue";
import createKitMaterial from "./views/admins/createKitMaterial.vue";

// import firebase from 'firebase/app';
// import 'firebase/auth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: auth,
      children: [
        {
          path: "/register",
          name: "register",
          component: registerComponent,
        },
        {
          path: "/login",
          name: "login",
          component: loginComponent,
        },
      ],
    },
    {
      path: "/",
      name: "home",
      component: home,
    },
    //Admins
    {
      path: "/admin/manageKits",
      name: "manageKits",
      component: manageKits,
    },
    {
      path: "/createKit",
      name: "createKit",
      component: createKit
    },
    {
      path: "/createKitMaterial/:kitId",
      name: "createKitMaterial",
      component: createKitMaterial,
      props: true
    }
  ],
});

// {
//   path: '/admin/edit/:id',
//   name: 'editUser',
//   component: editUser,
//   props: true
// },



// Guardia de navegación para verificar el estado de autenticación

// Hacer que esta redirección forzosa solo se active cuando el usuario no autenticado quiera ir a alguna pestaña que requiera de los
// datos del usuario
// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) {
//     next('/login'); // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a la página de inicio de sesión
//   } else {
//     next(); // De lo contrario, permite que el usuario acceda a la ruta solicitada
//   }
// });


export default router;
