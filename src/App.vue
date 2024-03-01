<script setup>
import { RouterLink, RouterView } from 'vue-router'

import home from "./views/home.vue";
import navbarComponent from "./components/navbarComponent.vue";

</script>

<template>
  <navbarComponent></navbarComponent>
  <div class="border-main-content"> 

  </div>
  <RouterView ></RouterView>
</template>

<style scoped>
 .border-main-content {
  margin-top: 50px;
 }
</style>
