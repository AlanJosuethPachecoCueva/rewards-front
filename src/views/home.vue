<template>
  <div class="page-container">
    <!-- <h1 class="page-title">{{ $t("Title") }}</h1> -->
    <div>
      <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
        <div>{{ $t("loading") }}</div>
      </div>
      <div v-else>
        <!-- <rewardContainerComponent
          :startDate="actualKit.startDate"
          :endDate="actualKit.endDate"
          :title="actualKit.title"
          :description="actualKit.description"
          :main-image-url="actualKit.mainImageUrl"
          :images="actualKit.images"
        ></rewardContainerComponent> -->
        <div v-for="kit in kits" :key="kit.id">
          <rewardContainerComponent
            :startDate="kit.startDate"
            :endDate="kit.endDate"
            :title="kit.title"
            :description="kit.description"
            :main-image-url="kit.mainImageUrl"
            :images="kit.images"
          ></rewardContainerComponent>
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
import "@google/model-viewer";

export default {
  components: {
    rewardContainerComponent,
    Carousel,
    Slide,
    "model-viewer": window.ModelViewer,
  },
  data() {
    return {
      logIn: true,
      kits: [],
      actualKit: null,
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
        let modifiedRewards = [];
        modifiedRewards = modifiedRewards.concat(kit.rewards.stickers);
        modifiedRewards = modifiedRewards.concat(kit.rewards.threeDObjects);
        modifiedRewards = modifiedRewards.concat(kit.rewards.products);
        return {
          shortDesc,
          ...kit,
          modifiedRewards,
        };
      });
      this.actualKit = this.kits[0];
      this.isLoading = false;
      console.log("this.kitsede: ", this.kits);
    } catch (error) {
      console.error(error);
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
.page-container {
  padding-top: 0px;
  background: black;
}

.page-title {
  font-weight: 900;
  text-align: center;
  color: white;
}

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
  border-top: 8px solid #cda434; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
