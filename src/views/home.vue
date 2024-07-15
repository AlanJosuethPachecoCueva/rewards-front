<template>
  <div class="text-center m-4">
    <h1>{{ $t('Title') }}</h1>
  </div>
  <div>
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <div>{{ $t("loading") }}</div>
    </div>
    <div v-else>
      <div v-for="kit in kits" :key="kit.id">
        <rewardContainerComponent :startDate="kit.startDate" :endDate="kit.endDate" :title="kit.title" :description="kit.description" :main-image-url="kit.mainImageUrl" :images="kit.images"></rewardContainerComponent>
        <div v-if="kit.modifiedRewards.length > 0">
          <h2 class="rewardsTitle">{{ $t('homeAwards') }}</h2>
          <div class="carousel-wrapper">
            <button @click="prev" class="carousel-nav left">‹</button>
            <carousel ref="carousel" items-to-show="5" :paginationEnabled="false" class="carousel-container">
              <Slide v-for="reward in kit.modifiedRewards" :key="reward.rewardId" class="carousel-slide">

                <div v-if="reward.type != '3d'" class="custom-card-size">
                  <img :src="reward.url" class="image-card" alt="Image" />
                  <div class="card-body">
                    <div class="min-content-card">
                      <h5 class="card-title">{{ reward.metadata[0].metadata.title }}</h5>
                    </div>
                  </div>
                </div>
                <div v-else class="custom-card-size-3d">
                  <model-viewer :src="reward.url" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom disable-rotate auto-rotate="0"></model-viewer>
                  <div class="card-body">
                    <div class="min-content-card">
                      <h5 class="card-title">{{ reward.metadata[0].metadata.title }}</h5>
                    </div>
                  </div>
                </div>
              </Slide>
            </carousel>
            <button @click="next" class="carousel-nav right">›</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rewardContainerComponent from "../components/rewardContainerComponent.vue";
import { getAllKitsRewardsController } from "@/controllers/kitsController";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
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
      isLoading: true, // Estado de carga
    };
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
        return {
          shortDesc,
          ...kit
        };
      });

      // Combinar los elementos de stickers, threeDObjects y products en un solo arreglo
      this.kits = this.kits.map((kit) => {
        let modifiedRewards = [];
        modifiedRewards = modifiedRewards.concat(kit.rewards.stickers);
        modifiedRewards = modifiedRewards.concat(kit.rewards.threeDObjects);
        modifiedRewards = modifiedRewards.concat(kit.rewards.products);
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
      this.isLoading = false;
    }
  },
  methods: {
    // Métodos para controlar las flechas del carrusel
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    },
  },
};
</script>

<style>
.rewardsTitle {
  display: flex;
  justify-content: center;
}

.carousel-wrapper {
  position: relative;
}

.carousel-container {
  overflow: hidden;
  padding: 100px; /* Ajustar el padding horizontal del contenedor del carrusel */
}

.carousel-slide {
  transition: transform 0.5s ease;
  display: flex;
  justify-content: center;
  
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem; /* Tamaño de las flechas */
}

.carousel-nav.left {
  left: 10px; /* Espacio desde el borde izquierdo */
}

.carousel-nav.right {
  right: 10px; /* Espacio desde el borde derecho */
}

.custom-card-size {
  width: 150px; /* Ancho de cada card */
  height: 250px; /* Alto de cada card */
  margin: auto;
  border: 1px solid #ddd; /* Añadir un borde ligero */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  overflow: hidden; /* Asegura que el contenido no se desborde */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-card-size img {
  max-width: 100%;
  height: 60%; /* Ajustar altura de la imagen */
  object-fit: cover; /* Asegura que la imagen cubra el área sin distorsionarse */
}

.custom-card-size-3d {
  width: 150px; /* Ancho de cada card */
  height: 250px; /* Alto de cada card */
  margin: auto;
  border: 1px solid #ddd; /* Añadir un borde ligero */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  overflow: hidden; /* Asegura que el contenido no se desborde */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-body {
  padding: 8px;
}

.min-content-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-title {
  font-size: 0.9rem; /* Tamaño de la fuente */
  margin-bottom: 4px;
}

/* Estilos para la animación de carga */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Altura completa de la ventana */
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semitransparente */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.spinner {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #CDA434; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
