import {
  authFirebase,
  signInWithEmailAndPassword,
  app,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
} from "../firebase/config.js";

const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

import { useUserStore } from "../../stores/userStore";

import { saveUserDataInFirebase, getUser } from "../userModel.js";

import { getUserByIdController } from "@/controllers/usersController.js";
import router from "@/router.js";

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(authFirebase, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // Guarda el usuario en el store
    const userStore = useUserStore();
    let userToSave = {
      name: user.reloadUserInfo.displayName,
      surname: " ",
      email: user.reloadUserInfo.email,
      city: " ",
      birthdate: " ",
      isAdmin: false,
      uid: user.uid,
      points: 0,
      direction: " "
    };

 
    try {
      console.log("userToSave: ", userToSave);
      //se guarda el usuario en la db de firebase
      let userByController = await saveUserDataInFirebase(userToSave);
      console.log("userByController: ", userByController);
      userStore.setUser(userToSave);
      userStore.setIsLogued(true);
    } catch (error) {
      console.log("Error saving user data in firebase: ", error);
      return false;
    }

    // Si la autenticación fue exitosa, devuelve true.
    return true;
  } catch (error) {
    console.log("error: ", error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...

    // Si ocurre un error, devuelve false.
    return false;
  }
}

async function logInWithGoogle() {
  try {
    const result = await signInWithPopup(authFirebase, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)

    //Aquí recupero los datos del usuario del store que no se guardan en auth, como isAdmin
    const userRestored = await getUser(user.uid);

    // Guarda el usuario en el store
    const userStore = useUserStore();

    userStore.setUser(userRestored);
    userStore.setIsLogued(true);
    console.log("userRestored: ", userRestored);

    // Si la autenticación fue exitosa, devuelve true.
    return true;
  } catch (error) {
    console.log("error: ", error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    //const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...

    // Si ocurre un error, devuelve false.
    return false;
  }
}

async function logInFirebase(userData) {
  try {
    const { email, password } = userData;

    const res = await signInWithEmailAndPassword(authFirebase, email, password);

    const user = res.user;

    const uid = user.uid;

    const resApi = await fetch(`${RUTA_SERVIDOR}/users/user/${uid}`);

    // Comprueba si la respuesta de la API es exitosa
    if (resApi.ok) {
      console.log("user login with firebase: ", user);
      // Parsea la respuesta a JSON
      let userData = await resApi.json();

      const userStore = useUserStore();
      let userToSave = {
        name: userData.name,
        surname: userData.surname ? userData.surname : "",
        email: userData.email,
        city: "",
        birthdate: "",
        isAdmin: false,
        authorizationCode: "",
        uid: user.uid,
        points: 0,
      };

      let userByController = await getUserByIdController(user.uid);
      userToSave.surname = userByController.surname;
      userToSave.city = userByController.city;
      userToSave.birthdate = userByController.birthdate;
      userToSave.points = userByController.points;
      userToSave.isAdmin = userByController.isAdmin;
      console.log("userToSave: ", userToSave);
      userStore.setUser(userToSave);
      userStore.setIsLogued(true);
      console.log("userToSave: ", userToSave);

      // Retornar el usuario para que pueda ser utilizado en la lógica de la aplicación
      return userData;
    } else {
      throw new Error("¡Unknow Error!");
    }
  } catch (error) {
    throw error;
  }
}

async function logOut() {
  try {
    // Llamar a la función de signOut proporcionada por Firebase Authentication
    await authFirebase.signOut();
    const res = true;
    console.log("Res: ", res);
    if (res == true) {
      //El cierre fue exitoso
      const userStore = useUserStore();
      userStore.setIsLogued(false);

      const emptyUser = {
        uid: "",
        name: "",
        surname: "",
        email: "",
        city: "",
        birthdate: "",
        isAdmin: "",
        authorizationCode: "",
        points: 0,
      };
      console.log("Paradw");
      userStore.setUser(emptyUser);
      router.push("/login")
    } else {
      console.error("Unable to log out.");
    }
  } catch (error) {
    console.error(error);
  }
}

export { logInFirebase, logOut, logInWithGoogle, signInWithGoogle };
