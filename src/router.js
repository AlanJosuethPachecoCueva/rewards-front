import { createRouter, createWebHistory } from "vue-router";

import home from "./views/home.vue";
import register from "./components/register.vue";
import login from "./components/login.vue";
import auth from "./views/auth.vue";

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
          component: register,
        },
        {
          path: "/login",
          name: "login",
          component: login,
        },
      ],
    },
    {
      path: "/",
      name: "home",
      component: home,
    },
  ],
});

export default router;
