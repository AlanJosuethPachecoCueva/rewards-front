<script>
import { computed } from "vue";

export default {
  data() {
    return {};
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
      <div class="d-flex flex-lg-row flex-column-reverse">
        <div class="card card1">
          <div class="row justify-content-center my-auto">
            <div class="col-md-12 col-12 my-5">
              <div class="row justify-content-center px-3 mb-3">
                <img id="logo" src="../assets/images/kvmi-en-blanco_redes-AzGj93a4EkuxVrkB.avif" />
              </div>
              <h3 class="mb-5 text-center heading">Somos Chocolate</h3>

              <h6 class="msg-info">Por favor, ingrese a su cuenta</h6>

              <div class="form-group">
                <label class="form-control-label text-muted">Nombre de usuario</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Phone no or email id"
                  class="form-control"
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
                />
              </div>

              <div class="row justify-content-center my-3 px-3">
                <button class="btn-block btn-color">Ingresar a KVMI</button>
              </div>

              <div class="row justify-content-center my-2">
                <a href="#"
                  ><small class="text-muted">Olvidaste la contraseña?</small></a
                >
              </div>
            </div>
          </div>
          <div class="bottom text-center mb-5">
            <p href="#" class="sm-text mx-auto mb-3">
              No tienes cuenta?<button class="btn btn-white ml-2">
                Crer una
              </button>
            </p>
          </div>
        </div>

        <div class="card card2">
          <div class="my-auto mx-md-5 px-md-5 right">
            <h3 class="text-white">KVMI, más que solo chocolate</h3>
            <small class="text-white"
              >Marca de chocolates de lujo elaborados con un raro grano de cacao amazónico. Creadores de mezclas exclusivas de temporada y experiencias alucinantes para tus cinco sentidos.</small
            >
          </div>
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

.card1 {
    width: 50%;
    padding: 40px 30px 10px 30px;
}

.card2 {
    width: 50%;
    background-image: linear-gradient(to right, #ac9759, #675e36);
}

#logo {
    width: 200px;
    height: 120px;
}

.heading {
    margin-bottom: 60px !important;
}
</style>
