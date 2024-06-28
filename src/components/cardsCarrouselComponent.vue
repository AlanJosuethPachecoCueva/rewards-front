<template>
  <carousel :items-to-show="cardsToShow" :paginationEnabled="true">
    <Slide v-for="kit in kits" :key="kit.title" class="carousel-slide p-2">
      <div class="card" style="width: 18rem">
        <img :src="kit.mainImageUrl" class="card-img-top imageCard" alt="Image" />
        <div class="card-body">
          <div class="minContentCard">
            <h5 class="card-title">{{ kit.title }}</h5>
            <p class="card-text">
              {{ kit.shortDesc }}
            </p>
            <a href="#" class="btn btn-primary">Ir</a>
          </div>

        </div>
      </div>
    </Slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  <!-- <button @click="loadMoreCards" v-if="loadedCards < totalCards">
    Load More
  </button> -->
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import { getKitsController, getImagesFromKitsController } from "@/controllers/kitsController";

export default {
  components: {
    Carousel,
    Slide,
    Pagination, Navigation
  },
  data() {
    return {
      totalCards: 20, // Suponiendo que tienes  10 tarjetas en total
      cardsToShow: 4, // Inicialmente mostramos  3 tarjetas
      loadedCards: 4, // Inicialmente cargamos  3 tarjetas
      kits: [],
    };
  },
  methods: {
    loadMoreCards() {
      // Aumenta el número de tarjetas cargadas
      this.loadedCards += this.cardsToShow;
      // Asegúrate de no cargar más tarjetas de las que tienes
      this.loadedCards = Math.min(this.loadedCards, this.totalCards);
    },
  },
  async mounted() {
    var res = await getKitsController();
    // res = await getImagesFromKitsController(res);
    console.log("res getKitsController: ", res);

    console.log("this.kits: ", this.kits);
    this.kits = res.map((kit) => {
      var shortDesc = kit.description;
      if (kit.description.length > 97) {
        shortDesc = shortDesc.slice(0, 97) + "...";
      }
      // Devuelve un nuevo objeto con el atributo shortDesc añadido
      return {
        shortDesc,
        ...kit,
      };
    });
    this.totalCards = this.kits.length;
    console.log("this.totalCards: ", this.totalCards);
    console.log("this.kits: ", this.kits);
  },

};
</script>

<style>
.imageCard {
  max-width: 286px;
  max-height: 163px;
}

.minContentCard{
  height: 239.2px;  
}


</style>
