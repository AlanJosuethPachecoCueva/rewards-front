<template #addons>
  <div class="bigContainerKit">
    <h2>Nuevo Material Publicitario</h2>
    <h3> Afiches & Banners</h3>
    <div class="createKitContainer">
      <div class="createKitContainerLeft">
        <div class="containerLeft">
          <carousel :items-to-show="cardsToShow" :paginationEnabled="true">
            <Slide v-for="kit in kitsImages" :key="kit" class="carousel-slide p-2">
              <div class="card" style="width: 18rem">
                <img :src="kit" class="card-img-top imageCard" alt="Image" />
                <!-- <div class="card-body">
                  <h5 class="card-title">{{ kit.title }}</h5>
                  <p class="card-text">
                    {{ kit.shortDesc }}
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div> -->
              </div>
            </Slide>
            <!-- <template #addons> -->
            <navigation />
            <pagination />
            <!-- </template> -->
          </carousel>
        </div>
      </div>
      <div class="createKitContainerRight">
        <div class="card cardContainer">
          <div class="form-group generateKitIA">
            <label class="label" for="exampleFormControlTextarea1">Generar con inteligencia artificial</label>
            <textarea v-model="aiPrompt" class="form-control" id="textAreaGenerateWithAI" rows="3"
              placeholder="Describa en máximo 400 palabras de que trata la campaña, el enfoque que debe tener; el público objetivo (Edad, género y ubicación geográfica de su audiencia), características del producto.
            - Beneficios clave que ofrece el producto.
            - ¿Cuál es el problema que resuelve el producto?
            - ¿Cuál es el propósito principal de la campaña? (aumentar ventas, conciencia de marca, lanzamiento de un nuevo producto, etc.)"></textarea>

            <!-- <form @submit.prevent="submitForm"> -->
            <div class="mb-3">
              <label for="imageInput" class="label">Seleccionar una imagen de referencia (Opcional):</label>
              <input type="file" class="form-control" id="imageInput" ref="imageInput" accept="image/*">
            </div>
            <!-- </form> -->

            <button type="button" class="btn btn-primary btnGenerateKit"
              @click="generateImageOpenAI()">Generar con
              IA
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
  página para agregar las imágenes de material a un kit en concreto



</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import { getKitByIdController, getKitsController, generateImageWithAIController, getKitsImagesController } from "../../controllers/kitsController";

export default {
  components: {
    Carousel,
    Slide,
    Pagination, Navigation
  },
  data() {
    return {
      logIn: true,
      kit: null,
      totalCards: 10, // Suponiendo que tienes  10 tarjetas en total
      cardsToShow: 3, // Inicialmente mostramos  3 tarjetas
      loadedCards: 3, // Inicialmente cargamos  3 tarjetas
      kitsImages: [],
    };
  },
  created() {
    this.getKit();
    this.getKitsImages();
  },
  methods: {
    async getKitsImages() {
      var res = await getKitsImagesController();
      console.log("this.kits: ", res);
      this.kitsImages = res; 
      this.totalCards = this.kitsImages.length;
      console.log("this.totalCards: ", this.totalCards);
      console.log("this.kits: ", this.kitsImages);
    },
    async getKit() {
      try {
        const idToSearch = this.$route.params.kitId;
        console.log("id recuperado en route: ", idToSearch);
        const kit = await getKitByIdController(idToSearch);
        if (!kit) {
          throw new Error('Unable to find kit');
        }
        console.log("kit encoontrado: ", kit);
        this.kit = kit;
        // this.user = Object.assign({}, user);
      } catch (error) {
        console.error('Unable to find kit:', error);
        throw error;
      }

    },
    async generateImageOpenAI() {

      try {

        const response = await generateImageWithAIController(this.aiPrompt);

        this.getKitsImages();
        // this.animateBorder();

        // this.name = response.title.replace(/"/g, "");
        // this.description = response.description.replace(/"/g, "");
        // this.slogans = response.slogans.join(' | ');

      } catch (error) {
        console.error('Error al generar imagen:', error);
      }
    },
  },
};
</script>

<style></style>
