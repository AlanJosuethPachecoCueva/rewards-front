import { ref, computed, onMounted, onUnmounted } from "vue";
import { defineStore } from "pinia";
import { authFirebase, onAuthStateChanged } from "@/models/firebase/config";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,

    isLogued: localStorage.getItem("isLogued")
      ? JSON.parse(localStorage.getItem("isLogued"))
      : false,
  }),
  getters: {
    // Agregar getters para acceder a los datos del usuario
    getUser: (state) => state.user,
    getIsLogued: (state) => state.isLogued,
  },
  actions: {
    setUser(user) {
      console.log("User recibido en store: ", user);
      const {
        uid,
        name,
        surname,
        email,
        direction,
        birthdate,
        isAdmin,
        points,
      } = user;
      const id = uid;
      const userAux = {
        id,
        name,
        surname,
        email,
        direction,
        birthdate,
        isAdmin,
        points,
      };
      this.user = userAux;

      localStorage.setItem("user", JSON.stringify(userAux)); // Guardar los datos del usuario en el localStorage al actualizar el store
    },
    setUserGoogle(user) {
      console.log("User recibido en store: ", user);
      const {
        uid,
        name,
        surname,
        email,
        direction,
        birthdate,
        isAdmin,
        authorizationCode,
        points,
      } = user;
      const id = uid;
      const userAux = {
        id,
        name,
        surname,
        email,
        direction,
        birthdate,
        isAdmin,
        authorizationCode,
        points,
      };
      this.user = userAux;

      localStorage.setItem("user", JSON.stringify(userAux)); // Guardar los datos del usuario en el localStorage al actualizar el store
    },
    setIsLogued(isLogued) {
      this.isLogued = isLogued;
      localStorage.setItem("isLogued", JSON.stringify(isLogued)); // Guardar los datos del usuario en el localStorage al actualizar el store
    },
    // Nueva acción para escuchar cambios en tiempo real
  
  },
  // Puedes llamar a listenForAuthChanges aquí para que comience a escuchar cuando el store se inicializa

});
