<template>
  <nav class="navbar navbar-expand-lg navBarPersonalized">
    <div class="container-fluid" style="padding-left: 30px">
      <a class="navbar-brand" :style="{ color: textColor }" href="/"
        ><img src="../assets/images/logo-kvmi.png" width="40px" height="38px"
      /></a>
      <!-- Botón para ocultar -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        :style="{ backgroundColor: textColor }"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent showPoints"
      >
        <!-- Opciones usarios administrador -->
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0"
          v-if="user != null && user.isAdmin == true"
        >
          <li class="nav-item">
            <a
              class="nav-link active navMenu"
              aria-current="page"
              href="/admin/manageKits"
              :style="{ color: textColor }"
              >{{ $t("ManageKits") }}</a
            >
          </li>
          <li class="dropdown nav-item">
            <a
              class="nav-link dropdown-toggle navMenu"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :style="{ color: textColor }"
              >{{ $t("Codes") }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a
                  class="dropdown-item"
                  href="/admin/codes"
                  :style="{ color: textColorContrast }"
                  >{{ $t("ManageCodes") }}</a
                >
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="/codes/reedemCode"
                  :style="{ color: textColorContrast }"
                  >{{ $t("Redeem") }}</a
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle navMenu"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :style="{ color: textColor }"
              >{{ $t("Awards") }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a
                  class="dropdown-item"
                  href="/rewards"
                  :style="{ color: textColorContrast }"
                  >{{ $t("ActiveAwards") }}</a
                >
              </li>
              <li v-if="user != null && user.isAdmin == true">
                <a
                  class="dropdown-item"
                  href="/admin/rewards"
                  :style="{ color: textColorContrast }"
                >
                  {{ $t("ManageAwards") }}</a
                >
              </li>
              <li v-if="user != null && user.isAdmin == true">
                <a
                  class="dropdown-item"
                  href="/admin/manageRedeemedProducts"
                  :style="{ color: textColorContrast }"
                >
                  {{ $t("ManageRedeemedProducts") }}</a
                >
              </li>
            </ul>
          </li>
        </ul>
        <!-- Opciones usarios cliente -->
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0"
          v-if="user != null && user.isAdmin == false && user.id != ''"
        >
          <li class="nav-item">
            <a
              class="nav-link active navMenu"
              aria-current="page"
              href="/codes/reedemCode"
              :style="{ color: textColor }"
              >{{ $t("Redeem") }}</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link active navMenu"
              aria-current="page"
              href="/rewards"
              :style="{ color: textColor }"
              >{{ $t("ActiveAwards") }}</a
            >
          </li>
        </ul>
        <!-- Opciones de incio de sesion -->
        <form class="navbar-nav me-auto mb-2 mb-lg-0 d-flex login-container">
          <button
            v-if="user == null || user.id == ''"
            class="btn d-flex align-items-center"
            style="font-size: 1rem; color: #ffffff; font-weight: 400"
            @click="goToLogin()"
          >
            {{ $t("Login") }}
            <i
              class="bi bi-person-circle"
              style="
                margin-left: 10px;
                font-size: 2rem;
                color: #ffffff;
                font-weight: bold;
              "
            ></i>
          </button>
          <!-- Opciones para usuario autenticado -->
          <ul
            class="navbar-nav me-auto mb-2 mb-lg-0 d-flex"
            style="display: flex; align-items: center"
            v-if="user != null && user.id != ''"
          >
            <li id="pointsContainer">
              <div class="puntosCacao">
                <a
                  class="nav-link"
                  href="#"
                  style="font-weight: bolder; color: #820f13"
                >
                  {{ user.points }}
                </a>
              </div>
              <i>
                <img
                  src="../assets//images//adaptive_icon.png"
                  alt="Points Icon"
                  style="width: 24px; height: 24px"
                />
              </i>
            </li>

            <li class="nav-item dropdown2">
              <a
                class="nav-link dropdown-toggle user-name"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                :style="{ color: textColor }"
              >
                {{ user.name }}
                <i
                  class="bi bi-person-fill"
                  style="font-size: 2rem; color: #ffffff; font-weight: bold"
                ></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    class="dropdown-item"
                    href="/userRewards"
                    :style="{ color: textColorContrast }"
                    >{{ $t("Profile") }}</a
                  >
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="closeSession()">{{
                    $t("LogOut")
                  }}</a>
                </li>
              </ul>
            </li>
            <div></div>
          </ul>
          <!-- Ícono del globo -->
          <div class="globe" @click="toggleLanguageButtons">
            <i
              class="bi bi-globe"
              style="font-size: 2rem; color: #ffffff; font-weight: bold"
            ></i>
          </div>

          <!-- Botones de idioma -->
          <div class="botones-idioma" v-if="showLanguageButtons">
            <button @click="changeLanguage('es')">ES</button>
            <button @click="changeLanguage('en')">EN</button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

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
      showLanguageButtons: false,
    };
  },
  components: {},
  methods: {
    goHome() {
      this.$router.push("/");
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
    toggleLanguageButtons() {
      this.showLanguageButtons = !this.showLanguageButtons;
    },
    changeLanguage(language) {
      this.$i18n.locale = language;
      this.$forceUpdate(); // Forzar actualización del componente
    },
  },
  setup() {
    const store = useUserStore();
    const user = computed(() => {
      return store.getUser;
    });
    // const user = computed(() => store.getUser);
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

<style>
#pointsContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding-inline: 10px;
  font-weight: bold;
  font-size: large;
  height: 10% !important;
}

/* #showPoints {
  background-color: red;
  display: flex;
  flex-direction: row;
} */

.puntosCacao {
  font-weight: bold;
}

#divGoloso {
  padding: 0px;
  margin: 0px;
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
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

.login-container {
  display: flex;
  position: fixed;
  align-items: center;
  padding-inline: 20px;
  right: 0;
}

.navBarPersonalized {
  width: 100%;
  height: 60px;
  /* background-color: rgb(65, 39, 39); */
  color: white !important;
  background-color: black;
  display: flex !important;
  align-items: center;
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
  font-weight: 600 !important;
}
.user-name {
  padding: 0 !important;
  display: flex !important;
  padding-inline: 15px !important;
  align-items: center;
}

.globe {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  cursor: pointer;
}

#pointsContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-item .dropdown2 {
  height: 50px;
  display: flex;
  align-items: center;
}

/* styles.css */
:root {
  --color-gold: #cda434; /* Definición del color gold */
}

.botones-idioma {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.botones-idioma {
  position: fixed;
  top: 100px; /* Ajusta la distancia desde la parte superior */
  right: 20px; /* Ajusta la distancia desde la derecha */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.botones-idioma button {
  background-color: var(--lightgray);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  padding: 0.5em 1em;
  margin: 0.2em 0; /* Ajusta el espacio entre los botones */
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 8px;
}
.botones-idioma button:hover {
  background-color: #ccc;
}
</style>
