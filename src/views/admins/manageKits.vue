<script>
import statsComponentVue from "@/components/admin/statsComponent.vue";
import rewardContainerComponent from "@/components/rewardContainerComponent.vue";
import { getKitsController } from "@/controllers/kitsController";
import statsComponent from "@/components/admin/statsComponent.vue";
import cardsCarrouselComponent from "@/components/cardsCarrouselComponent.vue";
export default {
  components: {
    rewardContainerComponent,
    statsComponent,
    cardsCarrouselComponent,
  },
  data() {
    return {
      logIn: true,
      kits: [],
    };
  },
  methods: {
    goToCreateKit(){
      this.$router.push("/createKit");
    }
    // async chargekits() {
    //   kits = await getKitsController();
    // },
  },
  async mounted() {
    this.kits = await getKitsController();
  },
};
</script>

<template>
  <!-- <div class="text-center m-4">
    <h1>Gestionar Material Publicitario</h1>
  </div> -->

  <statsComponent></statsComponent>

  <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center rowPersonalized">
        <div class="col-md-6">
          <button
            class="btn d-flex align-items-center"
            style="
              font-size: 1rem;
              background-color: rgb(65, 39, 39);
              font-weight: 400;
            "
            @click="goToCreateKit()"
          >
            <i
              class="bi bi-plus-circle-fill"
              style="font-size: 2rem; color: rgb(247, 246, 246); font-weight: bold"
            ></i>
          </button>
        </div>
        <div class="col-md-6">
          <button
            class="btn d-flex align-items-center"
            style="
              font-size: 1rem;
              background-color: rgb(65, 39, 39);
              font-weight: 400;
            "
          >
            <i
              class="bi bi-card-list"
              style="font-size: 2rem; color: rgb(247, 246, 246); font-weight: bold"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </section>
  <RouterView />
  <cardsCarrouselComponent></cardsCarrouselComponent>
</template>

<style>
.container {
  border-color: black;
}
.rowPersonalized {
  display: flex !important;
}
</style>
