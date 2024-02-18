<script>
import { computed } from "vue";
import { registerWithFirebase } from "../models/userModel.js";
import { logInFirebase } from "../models/firebase/auth.js";
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
                <label class="form-control-label text-muted">Nombres</label>
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
                <label class="form-control-label text-muted">Apellidos</label>
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
                <label class="form-control-label text-muted">Dirección</label>
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
                <label class="form-control-label text-muted">Email</label>
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
                  placeholder="Password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>

              <div class="row justify-content-center my-3 px-3">
                <button class="btn-block btn-color" @click="createUser()">
                  Registrarse en KVMI
                </button>
              </div>

              <!-- <div class="row justify-content-center my-2">
                <a href="#"
                  ><small class="text-muted">Olvidaste la contraseña?</small></a
                >
              </div> -->
            </div>
          </div>
          <div class="bottom text-center mb-5">
            <p href="#" class="sm-text mx-auto mb-3">
              Tienes cuenta?<button class="btn btn-white ml-2">Ingresar</button>
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
  height: 700px !important;
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
</style>
