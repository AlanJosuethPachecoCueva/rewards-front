fix this page order admin a client options of the navbar too
<template>
  <nav
    class="navbar navbar-expand-lg navBarPersonalized marron-principal"
    :style="{ backgroundColor: colors.principalBrown }"
  >
    <div class="container-fluid">
      <a class="navbar-brand" :style="{ color: textColor }" href="/">KVMI</a>
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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
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
              class="nav-link dropdown-toggle"
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

          <li class="nav-item">
            <a
              class="nav-link active navMenu"
              aria-current="page"
              href="#"
              :style="{ color: textColor }"
              >{{ $t("Help") }}</a
            >
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

          <li class="nav-item">
            <a
              class="nav-link active navMenu"
              aria-current="page"
              href="#"
              :style="{ color: textColor }"
              >{{ $t("Help") }}</a
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
                  :style="{ color: colors.lightyellow }"
                  style="font-weight: bolder"
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
            <button @click="$i18n.locale = 'es'">ES</button>
            <button @click="$i18n.locale = 'en'">EN</button>
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
    toggleLanguageButtons() {
      this.showLanguageButtons = !this.showLanguageButtons;
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

.nav-item.dropdown2 {
  height: 50px;
  display: flex;
  align-items: center;
}

/* styles.css */
:root {
  --color-gold: #cda434; /* Definición del color gold */
}
</style>
