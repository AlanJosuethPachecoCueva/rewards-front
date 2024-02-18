import {
  authFirebase,
  signInWithEmailAndPassword,
} from "../firebase/config.js";
// import axios from "axios";

const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

import { useUserStore } from "../../stores/userStore";

async function logInFirebase(userData) {
  try {
    const { email, password } = userData;

    const res = await signInWithEmailAndPassword(authFirebase, email, password);

    const user = res.user;

    const uid = user.uid;

    const resApi = await fetch(`${RUTA_SERVIDOR}/users/user/${uid}`);

    // Comprueba si la respuesta de la API es exitosa
    if (resApi.ok) {
      // Parsea la respuesta a JSON
      let userData = await resApi.json();

      // Retornar el usuario para que pueda ser utilizado en la lógica de la aplicación
      return userData;
    } else {
      throw new Error("¡Unknow Error!");
    }
  } catch (error) {
    throw error;
  }
}

async function signOut() {
  try {
    // Llamar a la función de signOut proporcionada por Firebase Authentication
    await authFirebase.signOut();
    return true;
  } catch (error) {
    // Manejo de errores en caso de fallo al cerrar sesión
    throw error;
  }
}

async function signOutGoogle() {
  try {
    // Cerrar la sesión en Google
    // google.accounts.id.disableAutoSelect();

    //google.accounts.id.cancel();
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke();
    google.accounts.id.renderButton();
    return true;
    // //recargar la página (hará que mi código detecte que no hay usuario y por ende lo rediriga al auth)
    // location.reload();
    // // Abrir la URL de cierre de sesión en una nueva pestaña
    // var signOutTab = window.open(signOutUrl, "_blank");
    // // Asegurarte de que la pestaña de cierre de sesión se abrió correctamente
    // if (signOutTab) {
    //   // Si se abrió correctamente, cerrar la url que se abre (la de cerrar sesión de google)
    //   window.close();
    // }
    //console.log("response axios in model: ", response.data);
  } catch (error) {
    // Manejo de errores en caso de fallo al cerrar sesión
    console.log("Error en model");
    return false;
  }
}


export {
    logInFirebase,
    signOut,
    signOutGoogle,
  };