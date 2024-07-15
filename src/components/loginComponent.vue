<script>
import { computed } from "vue";
import { logInFirebase, logInWithGoogle } from "../models/firebase/auth.js";

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      showPassword: false,
    };
  },
  components: {},
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const inputField = document.getElementById("psw");
      if (this.showPassword) {
        inputField.type = "text";
      } else {
        inputField.type = "password";
      }
    },
    goHome() {
      this.$router.push("/");
    },
    handleContacts() {
      //   this.$router.push("/contacts");
    },
    async signIn() {
      //Iniciamos y guardamos sesión
      const response = await logInFirebase({
        email: this.user.email,
        password: this.user.password,
      });

      if (!response) {
        await this.$swal({
          title: "¡Error al intentar iniciar sesión!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      } else {
        console.log("response.isAdmin: ", response.isAdmin);
        //Si el responde.admin es true quiere decir que es administrador entonces se le redirecciona al dashboard
        if (response.isAdmin === true) {
          this.$router.push("/admin/manageKits");
        } else {
          this.$router.push("/");
        }
      }
    },
    async signInGoogle() {
      console.log("HOLA");
      const res = await logInWithGoogle();

      if (!res) {
        await this.$swal({
          title:
            "Ocurrió un error al iniciar sesión con Google, intenta otra vez.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        return;
      } else {
        this.$router.push("/");
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
  <div class="login-page-container">
    <div class="card card1">
      <div class="row justify-content-center my-auto">
        <div class="col-md-12 col-12 m-top-5">
          <div class="row justify-content-center px-3 mb-3">
            <img
              id="logo"
              src="../assets/images/kvmi-en-blanco_redes-AzGj93a4EkuxVrkB.avif"
            />
          </div>
          <h3 class="mb-5 text-center heading">{{ $t("Slogan") }}</h3>

          <h6 class="msg-info">{{ $t("Credentials") }}</h6>

          <div class="form-group">
            <label class="form-control-label text-muted">{{
              $t("NombreusuarioLabel")
            }}</label>
            <input
              type="text"
              id="email"
              name="email"
              :placeholder="$t('PlaceholderUsuario')"
              class="form-control"
              v-model="user.email"
            />
          </div>

          <div class="form-group row align-items-center">
            <label class="form-control-label text-muted">{{
              $t("Contraseña")
            }}</label>
            <div class="input-group col-sm-6">
              <input
                type="password"
                id="psw"
                name="psw"
                :placeholder="$t('PlaceholderContrase')"
                class="form-control"
                v-model="user.password"
              />

              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="togglePasswordVisibility"
                >
                  <i
                    class="bi"
                    :class="{
                      'bi-eye': showPassword,
                      'bi-eye-slash': !showPassword,
                    }"
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <div class="row justify-content-center my-2">
            <a href="#"
              ><small class="text-muted">{{
                $t("OlvidasteContraseña")
              }}</small></a
            >
          </div>

          <div class="row justify-content-center my-3 px-3">
            <button class="btn-block btn-ingresar" @click="signIn()">
              {{ $t("BotonIngresar") }}
            </button>
          </div>

          <div class="separator">
            <div></div>
            <span>o</span>
            <div></div>
          </div>

          <div class="row justify-content-center my-3 px-3">
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
                <span class="gsi-material-button-contents">{{
                  $t("GoogleButton")
                }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="bottom text-center mb-5">
        <p class="sm-text mb-3">
          {{ $t("DonthaveAccount")
          }}<button class="btn btn-white ml-2">
            <a href="/register">{{ $t("CreateOne") }}</a>
          </button>
        </p>
      </div>
    </div>

    <div class="card card2">
      <div class="my-auto mx-md-5 px-md-5 right">
        <p class="card2-title">{{ $t("SloganEnterprise") }}</p>
        <p class="card2-text">{{ $t("DescripcionEmpresa") }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 0;
  border: none;
  margin: 0 !important;
  background-color: red;
}
.login-page-container {
  width: 100%;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.card1 {
  width: 50%;
  padding: 40px 30px 10px 30px;
  background-color: yellow;
  border: none !important;
}

.card2 {
  width: 50%;
  height: 100%;
  /* background-image: linear-gradient(to right, rgb(89, 76, 66), rgb(65, 39, 39)); */
  background: url(@/assets/images/login-bck.jpeg) no-repeat center center;
  background-size: cover;
  margin: 0px !important;
  border-radius: 0px 5px 5px 0px !important;
}

.card2-title {
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: xx-large;
}
.card2-text {
  color: white;
  font-size: large;
  text-align: center;
  font-weight: 400;
}

.background-image {
  background: url(@/assets/images/kingKVMI.jpeg) no-repeat center center fixed;
  background-size: cover;
  height: 150vh; /* Asegura que ocupe toda la altura de la vista */
  display: flex;
  align-items: center; /* Centra verticalmente el contenido */
}

#logo {
  width: 200px;
  height: 120px;
}

.heading {
  margin-bottom: 60px !important;
}

.separator {
  font-size: 15px; /* Tamaño de la letra "o" */
  color: #000; /* Color de la letra "o" */
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center; /* Centra horizontalmente el texto */
  line-height: 1; /* Ajusta la altura de la línea para centrar verticalmente */
}

.btn-ingresar {
  background-color: var(--principalBrown);
  color: white; /* Color del texto */
  padding: 14px 20px; /* Espacio interno */
  border: none; /* Borde */
  border-radius: 4px; /* Borde redondeado */
  cursor: pointer; /* Cursor al pasar el mouse */
  width: 100%; /* Ancho del botón */
  transition: background-color 0.3s; /* Transición de color de fondo */
}

.btn-ingresar:hover {
  background-color: var(--darkBrown); /* Color de fondo al pasar el mouse */
}
</style>
