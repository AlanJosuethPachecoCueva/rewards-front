<template>
  <div class="newGridContainer">
    <div class="newGridItem" v-for="image in kitsImages" :key="image.id" @click="selectKitImage(image)">
      <img :src="image.url" class="newImageCardTest" alt="Image" />
    </div>
  </div>

</template>

<script>
export default {
  components: {
    // Registrar el componente importado
  },
  data() {
    return {
      logIn: true
    };
  },
  methods: {
    switchButton() {
    },
  },
};
</script>

<style></style>
