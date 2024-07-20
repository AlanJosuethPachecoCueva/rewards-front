<script>
import { computed } from "vue";
import { registerWithFirebase } from "../models/userModel.js";
import { logInFirebase, signInWithGoogle } from "../models/firebase/auth.js";
import googleLogo from "../assets/images/google.png";
import { colors } from "/src/assets/colors.js";

export default {
  data() {
    return {
      terminosCondiciones: `1. Introducción \n
Bienvenido a KVMI Rewards. Al utilizar nuestro sistema, usted acepta los siguientes términos y condiciones relacionados con el manejo y protección de sus datos personales, de acuerdo con la Ley Orgánica de Protección de Datos Personales de Ecuador.\n
\n
2. Recolección de Datos\n
\n
Recopilamos los siguientes datos personales para el correcto funcionamiento de nuestro sistema:\n
\n
- Nombre\n
- Correo electrónico\n
- Información de contacto\n
- Datos de autenticación (contraseña, preguntas de seguridad)\n
- Actividad en la aplicación (participación en campañas, redención de códigos, uso del videojuego)\n
- Información de ubicación (para personalización del juego, a través de la API de clima)\n
\n
3. Uso de los Datos\n
\n
Los datos personales recopilados se utilizarán para:\n
\n
- Gestionar el registro y la autenticación de usuarios.\n
- Permitir la creación y gestión de campañas publicitarias.\n
- Facilitar la participación en el videojuego móvil 3D.\n
- Generar y redimir códigos asociados a productos.\n
- Administrar premios y recompensas.\n
- Proporcionar una experiencia de usuario personalizada.\n
- Realizar análisis y métricas de uso para mejorar el sistema.\n
- Proporcionar retroalimentación a los administradores del sistema.\n
\n
4. Protección de Datos\n
\n
Nos comprometemos a proteger sus datos personales mediante el uso de tecnologías de encriptación y medidas de seguridad adecuadas. Los datos serán almacenados de forma segura y solo accesibles por personal autorizado.\n
\n
5. Derechos del Usuario\n
\n
De acuerdo con la Ley Orgánica de Protección de Datos Personales, usted tiene derecho a:\n
\n
- Acceder a sus datos personales almacenados por nosotros.\n
- Rectificar cualquier dato incorrecto o desactualizado.\n
- Solicitar la eliminación de sus datos personales.\n
- Oponerse al procesamiento de sus datos personales para ciertos fines.\n
- Retirar su consentimiento en cualquier momento.\n
\n
6. Compartición de Datos\n
\n
No compartiremos sus datos personales con terceros, excepto cuando sea necesario para:\n
\n
- Cumplir con obligaciones legales.\n
- Proteger la seguridad e integridad del sistema.\n
- Proporcionar servicios esenciales relacionados con el funcionamiento del sistema, siempre bajo estrictas condiciones de confidencialidad.\n
\n
7. Retención de Datos\n
\n
Sus datos personales serán retenidos solo durante el tiempo necesario para cumplir con los fines mencionados en estos términos y condiciones, y de acuerdo con las disposiciones legales aplicables.\n
\n
8. Modificaciones\n
\n
Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será notificado a los usuarios a través de los canales adecuados y se publicará en nuestro sitio web.\n
\n
9. Contacto\n
\n
Para cualquier consulta, solicitud o reclamación relacionada con el manejo de sus datos personales, por favor contáctenos a través de kvmirewards@gmail.com .\n
\n
10. Aceptación de Términos\n
\n
Al utilizar nuestro sistema, usted confirma que ha leído y comprendido estos términos y condiciones, y que acepta el manejo de sus datos personales conforme a lo aquí establecido.\n
\n
Estos términos y condiciones proporcionan un marco básico para el manejo de datos personales, asegurando el cumplimiento con la Ley de Protección de Datos de Ecuador. Es recomendable que sean revisados y adaptados por un asesor legal especializado en protección de datos para garantizar su total conformidad con la legislación local.\n`,
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
      acceptTerms: false,
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
    async showTerms() {
      await this.$swal({
        title: "Términos y Condiciones",
        html: `
      <h2>1. Introducción</h2>
      <p>Bienvenido a KVMI Rewards. Al utilizar nuestro sistema, usted acepta los siguientes términos y condiciones relacionados con el manejo y protección de sus datos personales, de acuerdo con la Ley Orgánica de Protección de Datos Personales de Ecuador.</p>
      
      <h2>2. Recolección de Datos</h2>
      <p>Recopilamos los siguientes datos personales para el correcto funcionamiento de nuestro sistema:</p>
      <ul>
        <li>Nombre</li>
        <li>Correo electrónico</li>
        <li>Información de contacto</li>
        <li>Datos de autenticación (contraseña, preguntas de seguridad)</li>
        <li>Actividad en la aplicación (participación en campañas, redención de códigos, uso del videojuego)</li>
        <li>Información de ubicación (para personalización del juego, a través de la API de clima)</li>
      </ul>

      <h2>3. Uso de los Datos</h2>
      <p>Los datos personales recopilados se utilizarán para:</p>
      <ul>
        <li>Gestionar el registro y la autenticación de usuarios.</li>
        <li>Permitir la creación y gestión de campañas publicitarias.</li>
        <li>Facilitar la participación en el videojuego móvil 3D.</li>
        <li>Generar y redimir códigos asociados a productos.</li>
        <li>Administrar premios y recompensas.</li>
        <li>Proporcionar una experiencia de usuario personalizada.</li>
        <li>Realizar análisis y métricas de uso para mejorar el sistema.</li>
        <li>Proporcionar retroalimentación a los administradores del sistema.</li>
      </ul>

      <h2>4. Protección de Datos</h2>
      <p>Nos comprometemos a proteger sus datos personales mediante el uso de tecnologías de encriptación y medidas de seguridad adecuadas. Los datos serán almacenados de forma segura y solo accesibles por personal autorizado.</p>

      <h2>5. Derechos del Usuario</h2>
      <p>De acuerdo con la Ley Orgánica de Protección de Datos Personales, usted tiene derecho a:</p>
      <ul>
        <li>Acceder a sus datos personales almacenados por nosotros.</li>
        <li>Rectificar cualquier dato incorrecto o desactualizado.</li>
        <li>Solicitar la eliminación de sus datos personales.</li>
        <li>Oponerse al procesamiento de sus datos personales para ciertos fines.</li>
        <li>Retirar su consentimiento en cualquier momento.</li>
      </ul>

      <h2>6. Compartición de Datos</h2>
      <p>No compartiremos sus datos personales con terceros, excepto cuando sea necesario para:</p>
      <ul>
        <li>Cumplir con obligaciones legales.</li>
        <li>Proteger la seguridad e integridad del sistema.</li>
        <li>Proporcionar servicios esenciales relacionados con el funcionamiento del sistema, siempre bajo estrictas condiciones de confidencialidad.</li>
      </ul>

      <h2>7. Retención de Datos</h2>
      <p>Sus datos personales serán retenidos solo durante el tiempo necesario para cumplir con los fines mencionados en estos términos y condiciones, y de acuerdo con las disposiciones legales aplicables.</p>

      <h2>8. Modificaciones</h2>
      <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será notificado a los usuarios a través de los canales adecuados y se publicará en nuestro sitio web.</p>

      <h2>9. Contacto</h2>
      <p>Para cualquier consulta, solicitud o reclamación relacionada con el manejo de sus datos personales, por favor contáctenos a través de <a href="mailto:kvmirewards@gmail.com">kvmirewards@gmail.com</a>.</p>

      <h2>10. Aceptación de Términos</h2>
      <p>Al utilizar nuestro sistema, usted confirma que ha leído y comprendido estos términos y condiciones, y que acepta el manejo de sus datos personales conforme a lo aquí establecido.</p>

      <p>Estos términos y condiciones proporcionan un marco básico para el manejo de datos personales, asegurando el cumplimiento con la Ley de Protección de Datos de Ecuador. Es recomendable que sean revisados y adaptados por un asesor legal especializado en protección de datos para garantizar su total conformidad con la legislación local.</p>
    `,
        icon: "info",
        confirmButtonText: "Aceptar",
      });
    },
    async createUser() {
      //Validaciones
      this.isFormatValid = Object.values(this.validations).every(function (
        elemento
      ) {
        return elemento.state === true;
      });

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

      if (!this.acceptTerms) {
        await this.$swal({
          title: "Debes aceptar los términos y condiciones para registrarte.",
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
    <div class="card1-register">
      <div class="row justify-content-center px-3 mb-3">
        <h3 class="mb-2 text-center heading">{{ $t("LabelRegistro") }}</h3>

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

        <div class="form-group terms-condition-container">
          <input
            type="checkbox"
            class="form-check-input"
            id="acceptTerms"
            v-model="acceptTerms"
          />
          <label class="form-check-label" for="acceptTerms">
            {{ $t("AcceptTerms") }}
            <a href="#" @click.prevent="showTerms">{{
              $t("TermsAndConditions")
            }}</a>
          </label>
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

    <div class="card2-register">
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
.terms-condition-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  padding: 5px 10px;
}

.card1-register {
  width: 50%;
  height: fit-content;
  margin: 40px 100px 20px 80px;
  padding: 30px 35px;
  background-color: white;
  border-radius: 25px;
  border: none !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card2-register {
  width: 50%;
  height: 100%;
  /* background-image: linear-gradient(to right, rgb(89, 76, 66), rgb(65, 39, 39)); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px !important;
  border-radius: 0px 5px 5px 0px !important;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.9)
  );
}
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
  font-weight: bolder;
}

.swal2-popup {
  width: 80vw; /* Adjust this value as needed */
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
.form-group {
  margin-top: 10px !important;
}
</style>
