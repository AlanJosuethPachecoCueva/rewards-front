<script>
import { computed } from "vue";
import { colors } from "../assets/colors.js";
import { useUserStore } from "../stores/userStore.js";
import { logOut } from "../models/firebase/auth.js";

export default {
  data() {
    return {
      colors,
      textColor: colors.primaryTextColor,
      textColorContrast: colors.contastBlackColor,
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
    async closeSession() {
      console.log("Close session");
      try {
        await logOut();
        // this.userStatus = false;
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
  setup() {
    const store = useUserStore();
    const user = computed(() => {
      return store.getUser;
    });
    console.log("User at navBar: ", user);
    return { user };
  },
  mounted() {
    if (this.user != null) {
      console.log("User at navBar mounted: ", this.user.isAdmin);
    } else {
      console.log("No logueado");
    }

  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navBarPersonalized marron-principal" :style="{ backgroundColor: colors.principalBrown }">
    <div class="container-fluid">
      <a class="navbar-brand" :style="{ color: textColor }" href="/">Kvmi</a>
      <!-- Botón para ocultar -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        :style="{ backgroundColor: textColor }">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active navMenu" aria-current="page" href="#" :style="{ color: textColor }">Material
              Publicitario</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#" :style="{ color: textColor }"
              >Premios</a
            >
          </li> -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false" :style="{ color: textColor }">{{ $t('Awards')}}
              
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#" :style="{ color: textColorContrast }">{{ $t('Redeem')}}</a>
              </li>
              <li v-if="user != null && user.isAdmin == true">
                <a class="dropdown-item" href="/admin/manageKits" :style="{ color: textColorContrast }">
                {{ $t('ManagePublicitaryContent')}}</a>
              </li>

              <li>
                <a class="dropdown-item" href="#" :style="{ color: textColorContrast }">{{ $t('ActiveAwards')}}</a>
              </li>
              <li v-if="user != null && user.isAdmin == true">
                <a class="dropdown-item" href="/admin/rewards" :style="{ color: textColorContrast }">
                {{ $t('ManageAwards')}}</a>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#" :style="{ color: textColorContrast }">{{ $t('Help')}}</a>
              </li>
            </ul>
          </li>
          <!-- <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Disabled</a
            >
          </li> -->
        </ul>

        <div id="divGoloso" v-if="user != null">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex dropdown-menu-right" v-if="user.id != ''">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" :style="{ color: textColor }">
                <i class="bi bi-person-fill" style="font-size: 2rem; color: #ffffff; font-weight: bold"></i>
                {{ user.name }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <!-- <button class="btn" @click="closeSession()">
                  <i class="bi bi-box-arrow-right" style="font-size: 2rem; font-weight: bold" :style="{ color: textColorContrast }"></i>
                </button> -->
                  <a class="dropdown-item" href="#" @click="closeSession()">Cerrar sesión</a>
                </li>
                <!-- <li>
                <a class="dropdown-item" href="#" :style="{ color: textColorContrast }"
                  >Ver Premios Activos</a
                >
              </li> -->
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#" :style="{ color: textColorContrast }">Perfil</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>


        <form class="d-flex">
          <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button> -->

          <button v-if="user == null || user.id == ''" class="btn d-flex align-items-center"
            style="font-size: 1rem; color: #ffffff; font-weight: 400" @click="goToLogin()">
            {{ $t('Login')}}
            <i class="bi bi-person-circle" style="
                margin-left: 10px;
                font-size: 2rem;
                color: #ffffff;
                font-weight: bold;
              "></i>
          </button>
        </form>
      </div>
    </div>
  </nav>
  <!-- <div class="navBar">
    <i @click="goHome()" class="mdi mdi-home mdi-36px iconBtn"></i>
    <i
      @click="handleContacts()"
      class="mdi mdi-card-account-mail mdi-36px iconBtn"
    ></i>

    <div id="barTitle">Guru Project</div>

    <h2>Bienvenid@</h2>

    <i @click="signOut()" class="mdi mdi-logout mdi-36px iconBtn"></i>
  </div> -->
</template>

<style>
#divGoloso{
  padding: 0px;
  margin: 0px;
  display: flex;
  position: absolute;
  right: 0;
  top:0;
  /* Ajusta la posición a la derecha */
  width: max-content;
  /* Ajusta el ancho para que se extienda a lo ancho del contenedor */
  padding-right: 15px;
}

.dropdown-menu-right {
  display: flex;
  position: fixed;
  right: 0;
  /* Ajusta la posición a la derecha */
  width: max-content;
  /* Ajusta el ancho para que se extienda a lo ancho del contenedor */
  padding-right: 15px;
}

.navBarPersonalized {
  
  width: 100%;
  height: 50px;
  /* background-color: rgb(65, 39, 39); */
  color: white !important;
  display: flex !important;
  position: fixed !important;
  top: 0;
  z-index: 10;
}

.containerContacts {
  position: absolute;
  z-index: 3;
  width: 300px;
  height: 500px;

  top: 20px;
}

.navMenu {
  background-color: none;
}
</style>
