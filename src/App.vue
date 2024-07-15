<script setup>
import { RouterLink, RouterView } from "vue-router";

import home from "./views/home.vue";
import navbarComponent from "./components/navbarComponent.vue";
</script>

<template>
  <div id="app">
    <navbarComponent></navbarComponent>
    <div class="border-main-content"></div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
#app {
  /* background-color: aqua !important; */
  height: 100vh;
}

.border-main-content {
  margin-top: 50px;
}
</style>
