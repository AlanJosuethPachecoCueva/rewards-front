import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useUserStore } from "../../stores/userStore.js";
import { getUserByIdController } from "@/controllers/usersController.js";
// import router from "../../router/index.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Importar Firebase Storage

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FB_APIKEY}`,
  authDomain: `${import.meta.env.VITE_FB_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FB_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FB_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FB_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FB_APP_ID}`,
  measurementId: `${import.meta.env.VITE_FB_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const authFirebase = getAuth(app);

// Para inicio de sesión con google
const provider = new GoogleAuthProvider();

//PUSE YO PARA cargar imagenes
const storage = getStorage(app);


async function checkAuthState() {
  return new Promise((resolve) => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        console.log("Usuario autenticado:", user);
        resolve({ state: true, user });
      } else {
        console.log("No hay usuario autenticado");
        resolve({ state: false });
      }
    });
  });
}

// async function checkAuthState() {
//   const user = authFirebase.currentUser;
//   console.log("checkAuthState: ", user);
//   if (user) {
//     console.log("Usuario autenticado:", user);
//     return { state: true, user };
//   } else {
//     console.log("No hay usuario autenticado");
//     return { state: false };
//   }
// }

onAuthStateChanged(authFirebase, async (user) => {
  //console.log("onAuthStateChanged user: ", user);
  if (user != null) {
    // El usuario está autenticado
    // Aquí puedes acceder a la información del usuario en el objeto `user`
    console.log("Usuario autenticado:", user.uid);

    // Verificar si la respuesta es exitosa
    let data = user;
    //const data = await response.json();
    
    //console.log("dataaa act: ", data);

    const userStore = useUserStore();
    let userToSave = {
      name: data.displayName,
      surname: data.surname ? data.surname : "",
      email: data.email,
      city: "",
      birthdate: "",
      isAdmin: false,
      uid: user.uid,
      points: 0,
    };

    let userByController = await getUserByIdController(data.uid);
    //console.log("userByController: ", userByController);
    userToSave.surname = userByController.surname;
    userToSave.city = userByController.city;
    userToSave.birthdate = userByController.birthdate;
    userToSave.points = userByController.points;
    userToSave.isAdmin = userByController.isAdmin;
    userStore.setUser(userToSave);
    userStore.setIsLogued(true);
    //console.log("userToSave: ", userToSave);
  } else {
    // El usuario no está autenticado
    console.log("Usuario no autenticado");
    //Si el usuario no está autenticado lo redirige automáticamente a la pestaña de inicio
    router.push("/auth");
  }
});


function getUserInformation(){
  onAuthStateChanged(authFirebase, async (user) => {
    //console.log("onAuthStateChanged user: ", user);
    if (user != null) {
      // El usuario está autenticado
      // Aquí puedes acceder a la información del usuario en el objeto `user`
      console.log("Usuario autenticado:", user.uid);
  
      // Verificar si la respuesta es exitosa
      let data = user;
      //const data = await response.json();
      
      //console.log("dataaa act: ", data);
  
      const userStore = useUserStore();
      let userToSave = {
        name: data.displayName,
        surname: data.surname ? data.surname : "",
        email: data.email,
        city: "",
        birthdate: "",
        isAdmin: false,
        uid: user.uid,
        points: 0,
      };
  
      let userByController = await getUserByIdController(data.uid);
      //console.log("userByController: ", userByController);
      userToSave.surname = userByController.surname;
      userToSave.city = userByController.city;
      userToSave.birthdate = userByController.birthdate;
      userToSave.points = userByController.points;
      userToSave.isAdmin = userByController.isAdmin;
      userStore.setUser(userToSave);
      userStore.setIsLogued(true);
      //console.log("userToSave: ", userToSave);
    } else {
      // El usuario no está autenticado
      console.log("Usuario no autenticado");
      //Si el usuario no está autenticado lo redirige automáticamente a la pestaña de inicio
      router.push("/auth");
    }
  });
}
export {
  checkAuthState,
  app,
  authFirebase,
  provider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  getUserInformation,
  storage,
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL,
};
