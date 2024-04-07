<script>
import rewardContainerComponent from "../components/rewardContainerComponent.vue";
import { getKitsController, getImagesFromKitsController } from "@/controllers/kitsController";
export default {
  components: {
    rewardContainerComponent,
  },
  data() {
    return {
      logIn: true,
      kits: [],
      kitsImages: [],
    };
  },
  methods: {
    // async chargekits() {
    //   kits = await getKitsController();
    // },
  },
  async mounted() {
    this.kits = await getKitsController();

    this.kits = await getImagesFromKitsController(this.kits);


    console.log("kits en home: ", this.kits);



  }
};
</script>

<template>
  <div class="text-center m-4">
    <h1>Kits de premios activos!</h1>
  </div>

  <div v-for="kit in kits" :key="kit.id">
    <rewardContainerComponent :title="kit.title" :description="kit.description" :main-image-url="kit.mainImageUrl"
      :images="kit.images"></rewardContainerComponent>
      <!-- {{ kit.mainImageUrl }} -->
  </div>

</template>

<style></style>
