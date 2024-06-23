import { createRouter, createWebHistory } from "vue-router";

import home from "./views/home.vue";
import registerComponent from "./components/registerComponent.vue";
import loginComponent from "./components/loginComponent.vue";
import auth from "./views/auth.vue";
import manageKits from "./views/admins/manageKits.vue";
import createKit from "./views/admins/createKit.vue";
import editKit from "./views/admins/editKit.vue";
import createKitMaterial from "./views/admins/createKitMaterial.vue";
//rewards
import rewards from "./views/admins/rewards/rewards.vue";
import modifyReward from "./views/admins/rewards/modifyReward.vue";
import generateStickers from "./views/admins/rewards/generateStickers.vue";
import generate3DObjects from "./views/admins/rewards/generate3DObjects.vue";
import assignRewardTokit from "./views/admins/rewards/assignRewardToKit.vue";
import generateProduct from "./views/admins/rewards/generateProduct.vue";
import stickersTable from "./views/admins/rewards/stickersTable.vue";
import threeDObjectsTable from "./views/admins/rewards/threeDObjectsTable.vue";
import productsTable from "./views/admins/rewards/productsTable.vue";

//Codes
import codes from "./views/admins/codes/codes.vue";
import createCode from "./views/admins/codes/createCode.vue";
import viewGeneratedCodes from "./views/admins/codes/viewGeneratedCodes.vue";
import reedemCode from "./views/admins/codes/reedemCode.vue";

//Para usuarios no administradores
import showRewards from "./views/clients/showRewards.vue";
import reedemReward from "./views/clients/redeemReward.vue";
import userRewards from "./views/clients/userRewards.vue";

//Para la redirección
import { useUserStore } from "./stores/userStore.js";

import { authFirebase, checkAuthState } from "@/models/firebase/config.js";
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
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: "/",
      name: "home",
      component: home,
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: "/rewards",
      name: "showRewards",
      component: showRewards,
      meta: { requiresAuth: true, requiresAdmin: false },
    },
    {
      path: "/reedemReward",
      name: "reedemReward",
      component: reedemReward,
      meta: { requiresAuth: true, requiresAdmin: false },
      props: true,
    },
    {
      path: "/userRewards",
      name: "userRewards",
      component: userRewards,
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: "/modifyReward",
      name: "modifyReward",
      component: modifyReward,
      meta: { requiresAuth: true, requiresAdmin: true },
      props: true,
    },
    //Admins
    {
      path: "/admin/manageKits",
      name: "manageKits",
      component: manageKits,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/createKit",
      name: "createKit",
      component: createKit,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/editKit/:kitID",
      name: "editKit",
      component: editKit,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/createKitMaterial/:kitId",
      name: "createKitMaterial",
      component: createKitMaterial,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/rewards",
      name: "rewards",
      component: rewards,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/generateStickers",
      name: "generateStickers",
      component: generateStickers,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/generate3DObjects",
      name: "generate3DObjects",
      component: generate3DObjects,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/generateProducts",
      name: "generateProducts",
      component: generateProduct,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/assignRewardTokit/:rewardId",
      name: "assignRewardTokit",
      component: assignRewardTokit,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/stickersTable",
      name: "stickersTable",
      component: stickersTable,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/threeDObjectsTable",
      name: "threeDObjectsTable",
      component: threeDObjectsTable,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/productsTable",
      name: "productsTable",
      component: productsTable,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/codes",
      name: "codes",
      component: codes,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/codes/createCode",
      name: "createCode",
      component: createCode,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/codes/viewGeneratedCodes/:generatedCodes",
      name: "viewGeneratedCodes",
      component: viewGeneratedCodes,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/codes/reedemCode",
      name: "reedemCode",
      component: reedemCode,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: false },
    },
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
//   const currentUser = authFirebase.currentUser;
//   console.log("currentUser: ", currentUser);
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   console.log("requiresAuth: ", requiresAuth);
//   if (requiresAuth && !currentUser) {
//     next('/login'); // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a la página de inicio de sesión
//   } else {
//     next(); // De lo contrario, permite que el usuario acceda a la ruta solicitada
//   }
// });

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  console.log("requiresAuth: ", requiresAuth);
  console.log("requiresAdmin: ", requiresAdmin);

  if (requiresAuth || requiresAdmin) {
    const currentUser = await checkAuthState();
    console.log("currentUser: ", currentUser);

    //recuperar datos el usuario adicionales en colección users
    const store = useUserStore();
    const user = store.getUser;
    console.log("User at router: ", user);

    console.log("currentUser.state : ", currentUser.state);
    console.log("user.isAdmin: ", user.isAdmin);
    if (
      (!currentUser.state && requiresAuth) ||
      (!user.isAdmin && requiresAdmin)
    ) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
