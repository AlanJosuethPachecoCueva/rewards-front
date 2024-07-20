<script>
import { computed } from "vue";
import { registerWithFirebase } from "../models/userModel.js";
import { logInFirebase, signInWithGoogle } from "../models/firebase/auth.js";
import googleLogo from "../assets/images/google.png";
import { colors } from "/src/assets/colors.js";

export default {
  data() {
    return {
      isFormatValid: false,
      user: {
        name: "",
        surname: "",
        password: "",
        email: "",
        direction: "",
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
        direction: { state: true, error: "" },
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
    async signInGoogle() {
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
      } else {
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
            title: "¡Error tratando de crear usuario!",
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
          this.$router.push("/admin/manageKits");
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
  <div class="register-page">
    <div class="card1">
      <div class="row justify-content-center px-3 mb-3">
        <div class="row justify-content-center px-3 mb-3">
          <img
            id="logo"
            src="../assets/images/kvmi-en-blanco_redes-AzGj93a4EkuxVrkB.avif"
          />
        </div>
        <h3 class="mb-5 text-center heading">{{ $t("LabelRegistro") }}</h3>

        <div class="form-group">
          <label class="form-control-label text-muted">{{ $t("Name") }} </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            :placeholder="$t('PlaceHolderName')"
            class="form-control"
            v-model="user.name"
          />
        </div>

        <div class="form-group">
          <label class="form-control-label text-muted"
            >{{ $t("LastName") }}
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            :placeholder="$t('PlaceholderLastName')"
            class="form-control"
            v-model="user.surname"
          />
        </div>

        <div class="form-group">
          <label class="form-control-label text-muted"
            >{{ $t("Address") }}
          </label>
          <input
            type="text"
            id="dirección"
            name="dirección"
            :placeholder="$t('PlaceholderAddress')"
            class="form-control"
            v-model="user.direction"
          />
        </div>

        <div class="form-group">
          <label class="form-control-label text-muted">{{ $t("Mail") }} </label>
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
          <label class="form-control-label text-muted"
            >{{ $t("Password") }}
          </label>
          <input
            type="password"
            id="psw"
            name="psw"
            :placeholder="$t('PlaceholderPassword')"
            class="form-control"
            v-model="user.password"
          />
        </div>

        <div class="row justify-content-center my-3 px-3">
          <button class="btn-block btn-registrarse" @click="createUser()">
            {{ $t("RegisterButton") }}
          </button>
        </div>

        <div class="row justify-content-center px-3">
          <button class="gsi-material-button" @click="signInGoogle()">
            <div class="gsi-material-button-state"></div>
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
              <span class="gsi-material-button-contents">{{
                $t("GoogleButton")
              }}</span>
            </div>
          </button>
        </div>
      </div>
      <div class="bottom-options-register">
        <p class="bottom-text-register">
          {{ $t("AlreadyHaveAccount")
          }}<button style="border: none; background: none">
            <a href="/login">{{ $t("EnterLogin") }}</a>
          </button>
        </p>
      </div>
    </div>

    <div class="card2">
      <div class="my-auto mx-md-5 px-md-5 right">
        <p class="card2-title">KVMI REWARDS</p>
        <p class="card2-text">
          Empieza a vivir una experiencia KVMI y descubre un mundo de premios
          solo para ti.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.bottom-options-register {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.register-page {
  background: url(@/assets/images/banner_hor.png) no-repeat center center;
  width: 100%;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-size: cover;
}

.section-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.left-register-page {
  background-color: white;
  border-radius: 25px;
  margin: 20px 10px;
  padding: 10px 40px;
  width: 50%;
}

.right-register-page {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bottom-text-register {
  color: black !important;
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
  background-color: black;
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
  background-color: var(--darkBrown); /* Color de fondo al pasar el mouse */
}
</style>
