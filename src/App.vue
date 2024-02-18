<script setup>
import { RouterLink, RouterView } from 'vue-router'

import home from "./views/home.vue";
import navbar from "./components/navbar.vue";

</script>

<template>
  <navbar></navbar>

  <RouterView></RouterView>
</template>

<style scoped>
 
</style>
