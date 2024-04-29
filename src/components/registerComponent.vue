<script>
import { computed } from "vue";
import { registerWithFirebase } from "../models/userModel.js";
import { logInFirebase, signInWithGoogle } from "../models/firebase/auth.js";
import googleLogo from "../assets/images/google.png";

export default {
  data() {
    return {
      isFormatValid: false,
      user: {
        name: "",
        surname: "",
        password: "",
        email: "",
        city: "",
        birthdate: "",
        isAdmin: false,
      },
      verifyPassword: {
        password: "",
        error: "",
        state: false,
      },
      validations: {
        name: { state: true, error: "" },
        surname: { state: true, error: "" },
        password: { state: true, error: "" },
        email: { state: true, error: "" },
        city: { state: true, error: "" },
        birthdate: { state: true, error: "" },
      },
      showPassword: false,
      showPassword2: false,
    };
  },
  components: {},
  methods: {
    goHome() {
      this.$router.push("/");
    },
    handleContacts() {
      //   this.$router.push("/contacts");
    },
    async signOut() {
      //   try {
      //     await logOutGoogle();
      //     window.location.reload();
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
    async signInGoogle(){
      console.log("HOLA");
      const res = await signInWithGoogle();
      
      if (!res) {
        await this.$swal({
          title:
            "Ocurrió un error al iniciar sesión con Google, intenta otra vez.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        return;
      }else{
        this.$router.push("/");
      }
    },
    async createUser() {
      //Validaciones
      this.isFormatValid = Object.values(this.validations).every(function (
        elemento
      ) {
        return elemento.state === true;
      });

      //Comprobar que las contraseñas sean iguales
      // if (!this.verifyPassword.state) {
      //   await this.$swal({
      //     title:
      //       "La contraseña y la confirmación de contraseña deben ser iguales.",
      //     icon: "error",
      //     showCancelButton: false,
      //     confirmButtonText: "OK",
      //   });
      //   return;
      // }

      if (!this.isFormatValid) {
        await this.$swal({
          title:
            "Asegúrate que los datos cumplan con las reglas mostradas a la derecha.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });

        return;
      }

      const result = await this.$swal({
        title: "¿Quieres registrarte?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Not",
      });
      if (result.isConfirmed) {
        const res = await registerWithFirebase(this.user);

        //Valida si el usuario se creó correctamente
        if (!res) {
          await this.$swal({
            title: "¡Error tratando de crear al usuario!",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });

          return;
        }

        await this.$swal({
          title: "¡Registrado satisfactoriamente!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        });

        //Iniciamos y guardamos sesión
        const response = await logInFirebase({
          email: this.user.email,
          password: this.user.password,
        });

        if (!response) {
          await this.$swal({
            title: "¡Error tratando de iniciar sesión!",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }

        //Si el responde.admin es true quiere decir que es administrador entonces se le redirecciona al dashboard
        if (response.admin == "true") {
          this.$router.push("/homeAdmin");
        } else {
          this.$router.push("/");
        }
      }
    },
  },
  mounted() {
    // const store = useUserStore();
    // const user = computed(() => {
    //   return store.getUser;
    // });
    // console.log("User at navBar: ", user);
    // return { user };
  },
};
</script>

<template>
  <div class="container px-4 py-5 mx-auto">
    <div class="card card0">
      <div class="d-flex flex-lg-row flex-column-reverse containerCard">
        <div class="card card3">
          <div class="row justify-content-center my-auto">
            <div class="col-md-12 col-12 my-5">
              <div class="row justify-content-center px-3 mb-3">
                <img
                  id="logo"
                  src="../assets/images/kvmi-en-blanco_redes-AzGj93a4EkuxVrkB.avif"
                />
              </div>
              <h3 class="mb-5 text-center heading">Somos Chocolate</h3>

              <h6 class="msg-info">Regístrese a continuación</h6>

              <div class="form-group">
                <label class="form-control-label text-muted">Nombres: </label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  placeholder="Nombres"
                  class="form-control"
                  v-model="user.name"
                />
              </div>

              <div class="form-group">
                <label class="form-control-label text-muted">Apellidos: </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  placeholder="Apellidos"
                  class="form-control"
                  v-model="user.surname"
                />
              </div>

              <div class="form-group">
                <label class="form-control-label text-muted">Dirección: </label>
                <input
                  type="text"
                  id="dirección"
                  name="dirección"
                  placeholder="Dirección"
                  class="form-control"
                  v-model="user.city"
                />
              </div>

              <div class="form-group">
                <label class="form-control-label text-muted">Correo Electrónico </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  class="form-control"
                  v-model="user.email"
                />
              </div>

              <div class="form-group">
                <label class="form-control-label text-muted">Contraseña</label>
                <input
                  type="password"
                  id="psw"
                  name="psw"
                  placeholder="Contraseña"
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              
              <div class="row justify-content-center my-3 px-3">
                <button class="btn-block btn-registrarse" @click="createUser()">
                  Registrarse 
                </button>
              </div>
              <button class="gsi-material-button" @click="signInGoogle()">
                <div class="gsi-material-button-state"></div>
                <div class="gsi-material-button-content-wrapper">
                  <div class="gsi-material-button-icon">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      style="display: block"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span class="gsi-material-button-contents"
                    >Ingresar con Google</span
                  >
                </div>
              </button>
              

              <!-- <div class="row justify-content-center my-2">
                <a href="#"
                  ><small class="text-muted">Olvidaste la contraseña?</small></a
                >
              </div> -->
            </div>
          </div>
          <div class="bottom text-center mb-5">
            <p class="sm-text mx-auto mb-3">
              ¿Ya tienes cuenta?<button class="btn btn-white ml-2"><a href="/login">Ingresar</a></button>
            </p>
          </div>
        </div>

        <div class="card card4">
          <img
            id="bannerRegister"
            src="../assets/images/Banner Vertical Register.webp"
          />
          <!-- <div class="my-auto mx-md-5 px-md-5 right">
            <h3 class="text-white">KVMI, más que solo chocolate</h3>
            <small class="text-white"
              >Marca de chocolates de lujo elaborados con un raro grano de cacao amazónico. Creadores de mezclas exclusivas de temporada y experiencias alucinantes para tus cinco sentidos.</small
            >
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 0;
  border: none;
}

.containerCard {
  height: 900px !important;
  overflow: hidden;
}

.card3 {
  width: 70%;
  padding: 40px 30px 10px 30px;
}

.card4 {
  width: 30%;
  background-image: linear-gradient(to right, #ac9759, #675e36);
}

#bannerRegister {
}

.heading {
  margin-bottom: 60px !important;
}

.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: "Roboto", arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color 0.218s, border-color 0.218s,
    box-shadow 0.218s;
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: "Roboto", arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity 0.218s;
  transition: opacity 0.218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state,
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}

.btn-registrarse {
  background-color: #6f4e37; /* Color de fondo */
  color: white; /* Color del texto */
  padding: 14px 20px; /* Espacio interno */
  margin: 8px 0; /* Margen externo */
  border: none; /* Borde */
  border-radius: 4px; /* Borde redondeado */
  cursor: pointer; /* Cursor al pasar el mouse */
  width: 100%; /* Ancho del botón */
  transition: background-color 0.3s; /* Transición de color de fondo */
}

.btn-registrarse:hover {
  background-color: #4C3D39; /* Color de fondo al pasar el mouse */
}
</style>
