<script>
import { computed } from "vue";

export default {
  data() {
    return {};
  },
  components: {
    
  },
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
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Kvmi</a>
      <!-- Botón para ocultar -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"
              >Material Publicitario</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Premios</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Premios
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Redimir</a></li>
              <li><a class="dropdown-item" href="#">Ver Premios Activos</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Ayuda</a></li>
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
        <form class="d-flex">
          <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button> -->
        <button class="btn" type="submit">
            <i class="bi bi-box-arrow-right" style="font-size:   2rem; color: #007bff; font-weight: bold;"></i>
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
.navBar {
  height: 50px;
  background-color: red;
}
.containerContacts {
  position: absolute;
  z-index: 3;
  width: 300px;
  height: 500px;

  top: 20px;
}
</style>
