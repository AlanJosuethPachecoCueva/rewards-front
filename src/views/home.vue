<script>
import rewardContainerComponent from "../components/rewardContainerComponent.vue";
import { getKitsController } from "@/controllers/kitsController";
export default {
  components: {
    rewardContainerComponent,
  },
  data() {
    return {
      logIn: true,
      kits:[],
      // cardItem:{
      //   title: "Sinfonía del placer P1",
      //   description:"Sumérgete en la exquisita sinfonía de placer con el nuevo Chocolate Dimple. Nuetra campaña 'Sinfonía de Placer' celebra la experiencia única que ofrece cada bocado de este delicioso chocolate.",
      //   mainImageUrl: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2FCamp1.webp?alt=media&token=c7fc8523-4d91-41a7-a5dc-63584f8100bc",
      //   images:[
      //     "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2Fcamp2.webp?alt=media&token=a7f7c59c-abb7-482e-a10e-3400abd8d6eb",
      //     "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2Fcamp3.webp?alt=media&token=9eda9980-615b-43e0-a263-519275f41a10",
      //     "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2Fcamp4.webp?alt=media&token=82f4c906-4c8e-4490-8607-b6e11ec4905d"
      //   ]
      // }
    };
  },
  methods: {
    // async chargekits() {
    //   kits = await getKitsController();
    // },
  },
  async mounted() {
    this.kits = await getKitsController();
  }
};
</script>

<template>
  <div class="text-center m-4">
    <h1>Kits de premios activos!</h1>
  </div>
  <rewardContainerComponent v-for="kit in kits" :key="kit.id"
    :title="kit.title"
    :description="kit.description"
    :main-image-url="kit.mainImageUrl"
    :images="kit.images"
  ></rewardContainerComponent>
</template>

<style></style>
