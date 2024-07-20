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
    <div class="card1">
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
          ><small class="text-muted">{{ $t("OlvidasteContraseña") }}</small></a
        >
      </div>

      <div class="row justify-content-center my-3 px-3">
        <button class="btn-block btn-ingresar" @click="signIn()">
          {{ $t("BotonIngresar") }}
        </button>
      </div>

      <div class="separator">
        <div></div>
        <span>or</span>
        <div></div>
      </div>

      <div class="row justify-content-center my-3 px-3">
        <button class="gsi-material-button" @click="signInGoogle()">
          <div
            class="gsi-material-button-content-wrapper"
            style="
              display: flex;
              flex-direction: row;
              justify-content: center;
              gap: 10px;
            "
          >
            <img src="../assets/images/google.png" width="24px" />
            <span>{{ $t("GoogleButton") }}</span>
          </div>
        </button>
      </div>
      <div class="bottom-options-register">
        <p class="bottom-text-register">
          {{ $t("DonthaveAccount") }}
          <button class="btn btn-white ml-2">
            <a href="/register">{{ $t("CreateOne") }}</a>
          </button>
        </p>
      </div>
    </div>

    <div class="card2">
      <div class="my-auto mx-md-5 px-md-5 right">
        <p class="card2-title">{{ $t("SloganEnterprise") }}</p>
        <p class="card2-text">{{ $t("DescripcionEmpresa") }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.login-page-container {
  width: 100%;
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
  padding-bottom: 5%;
  display: flex;
  flex-direction: row;
  background: url(@/assets/images/lg-bck.png) no-repeat center center;
  background-size: cover;
}

.card1 {
  width: 50%;
  height: 100%;
  margin: 30px 10px 70px 30px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 25px;
  border: none !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card2 {
  width: 50%;
  height: 100%;
  /* background-image: linear-gradient(to right, rgb(89, 76, 66), rgb(65, 39, 39)); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px !important;
  border-radius: 0px 5px 5px 0px !important;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
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
  background-color: black;
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
