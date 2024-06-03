<template>
  <div class="text-center m-4">
    <h1>Campañas Publicitarias Activas</h1>
  </div>
  <div>
    <div v-if="isLoading">Cargando...</div>
    <div v-else>

      <div v-for="kit in kits" :key="kit.id">
        <rewardContainerComponent :title="kit.title" :description="kit.description" :main-image-url="kit.mainImageUrl"
          :images="kit.images"></rewardContainerComponent>
        <!-- {{ kit.mainImageUrl }} -->
        <div v-if="kit.modifiedRewards.length > 0">
        <h2 class="rewardsTitle">Premios del kit</h2>
          <carousel items-to-show="6" :paginationEnabled="true" class="carousel-container">
            <Slide v-for="reward in kit.modifiedRewards" :key="reward.rewardId" class="carousel-slide">
              <div v-if="reward.type != '3d'" class="custom-card-size">
                <img :src="reward.url" class="image-card" alt="Image" />
                <div class="card-body">
                  <div class="min-content-card">
                    <h5 class="card-title">{{ reward.metadata[0].metadata.title }}</h5>
                    <!-- <p class="card-text">{{ reward.metadata[0].metadata.description }}</p> -->
                    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                  </div>
                </div>
              </div>
              <div v-else class="custom-card-size-3d">
                <model-viewer :src="reward.url" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom
                  disable-rotate auto-rotate="0"></model-viewer>

                <!-- <img :src="object.url" class="card-img-top imageCard" alt="Image" /> -->
                <div class="card-body">
                  <div class="min-content-card">
                    <h5 class="card-title">{{ reward.metadata[0].metadata.title }}</h5>
                    <!-- <p class="card-text">
                      {{ reward.metadata[0].metadata.description }}
                    </p> -->
                  </div>

                </div>
              </div>
            </Slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import rewardContainerComponent from "../components/rewardContainerComponent.vue";
import { getKitsController, getImagesFromKitsController, getAllKitsRewardsController } from "@/controllers/kitsController";
import { getAllKits_RewardsController } from "@/controllers/rewardsController.js";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import '@google/model-viewer';

export default {
  components: {
    rewardContainerComponent,
    Carousel,
    Slide,
    'model-viewer': window.ModelViewer,
  },
  data() {
    return {
      logIn: true,
      kits: [],
      kitsImages: [],
      isLoading: true, // Estado de carga
    };
  },
  methods: {
    // async chargekits() {
    //   kits = await getKitsController();
    // },
  },
  async created() {
    try {
      // Obtener los kits y modificar su estructura antes de montar el componente
      this.kits = await getAllKitsRewardsController();

      // Modificar la estructura de cada kit
      this.kits = this.kits.map((kit) => {
        var shortDesc = kit.description;
        if (kit.description.length > 97) {
          shortDesc = shortDesc.slice(0, 97) + "...";
        }

        // Devuelve un nuevo objeto con el atributo shortDesc añadido
        return {
          shortDesc,
          ...kit
        };
      });

      // Combinar los elementos de stickers, threeDObjects y products en un solo arreglo
      this.kits = this.kits.map((kit) => {
        let modifiedRewards = [];

        // Añadir cada elemento individual de los arreglos a modifiedRewards
        modifiedRewards = modifiedRewards.concat(kit.rewards.stickers);
        modifiedRewards = modifiedRewards.concat(kit.rewards.threeDObjects);
        modifiedRewards = modifiedRewards.concat(kit.rewards.products);

        // Retorna un nuevo objeto kit con el arreglo modifiedRewards añadido
        return {
          ...kit,
          modifiedRewards
        };
      });

      console.log("this.kitsede: ", this.kits);
    } catch (error) {
      console.error(error)
      this.isLoading = false;
    } finally {
      // Establece isLoading en false después de completar la carga y el procesamiento
      this.isLoading = false;
    }
  },

};
</script>

<style>
.rewardsTitle{
  display: flex;
  justify-content: center;
}

.carousel-container {
  margin: 0 -10px;
  /* Ajusta el margen horizontal */
}

.carousel-slide {
  padding: 1rem;
  /* Espaciado entre elementos del carrusel */
  display: flex;
  justify-content: center;
  margin: 0 5px;
}

.custom-card-size {
  width: 100%;
  /* Ajusta el ancho según tus necesidades */
  height: fit-content;
  margin: auto;
  border: 1px solid #ddd;
  /* Estilo de borde opcional */
  border-radius: 8px;
  /* Bordes redondeados opcionales */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Sombra opcional */
  overflow: hidden;
  /* Para asegurarse de que el contenido no se desborde */

  /* justify-content: center;
  align-items: center; */
}

.custom-card-size-3d {
  width: 100%;
  /* Ajusta el ancho según tus necesidades */
  height: fit-content;
  margin: auto;
  /* border: 1px solid #ddd !important; */
  /* Estilo de borde opcional */
  border-radius: 8px;
  /* Bordes redondeados opcionales */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Sombra opcional */
  overflow: hidden;
  /* Para asegurarse de que el contenido no se desborde */

  /* justify-content: center;
  align-items: center; */
}

.image-card {
  width: 100%;
  height: 30% !important;
  /* Ajusta la altura de la imagen según tus necesidades */
  object-fit: cover;
  /* Ajusta la imagen sin distorsionarla */
}

.card-body {
  padding: 16px;
  /* Espaciado interno */
}

.min-content-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.card-text {
  flex-grow: 1;
  margin-bottom: 16px;
}
</style>
