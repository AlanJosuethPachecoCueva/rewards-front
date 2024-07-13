<template #addons>
  <div class="bigContainerKit">
    <h2>Nuevo Material Publicitario</h2>
    <h3>Afiches & Banners</h3>
    <div class="createKitContainer">
      <div class="createKitContainerLeft">
        <div class="showInformationLeft">
          <div class="showDataKit">
            <h4>Tu chocolate</h4>
            <div class="card cardKitInformation" style="height: fit-content">
              {{ kit.title }}
            </div>
            <div
              class="card cardKitInformation"
              style="height: fit-content; text-align: left"
            >
              {{ kit.description }}
            </div>
            <div
              class="card cardKitInformation"
              style="height: fit-content; text-align: left"
            >
              {{ kit.slogans }}
            </div>
          </div>
          <div
            class="imagesSelector"
            :class="{ imagesSelectorMiddle: inMiddle }"
          >
            <h4>Imágenes</h4>
            <div class="row">
              <div
                class="col-md-4 col-lg-4 mb-3"
                v-for="selectedImage in selectedImages"
                :key="selectedImage"
              >
                <div class="card cardsSelectedImages">
                  <img
                    :src="selectedImage.url"
                    class="card-img-top"
                    alt="I"
                    @click="deleteKitImage(selectedImage)"
                  />
                  <!-- <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item.description }}</p>
                    <a href="#" class="btn btn-primary">Ver más</a>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="containerLeft">
          <carousel :items-to-show="cardsToShow" :paginationEnabled="true">
            <Slide
              v-for="image in kitsImages"
              :key="image"
              class="carousel-slide p-2"
            >
              <div class="card" style="width: 18rem">
                <img
                  :src="image.url"
                  class="card-img-top imageCard"
                  alt="Image"
                  @click="selectKitImage(image)"
                />
              </div>
            </Slide>
          </carousel>
        </div> -->
        <div class="containerLeftImages">
          <div class="newGridContainer">
            <div
              class="newGridItem"
              v-for="image in kitsImages"
              :key="image.id"
              @click="selectKitImage(image)"
            >
              <img :src="image.url" class="newImageCardTest" alt="Image" />
            </div>
          </div>
        </div>
      </div>
      <div class="createKitContainerRight">
        <div class="card cardContainer">
          <div class="form-group generateKitIA">
            <label class="label" for="exampleFormControlTextarea1"
              >Subir una diseño creado por mí</label
            >
            <input
              v-model="imageTitle"
              class="form-control"
              id="imageUploadTitle"
              rows="3"
              placeholder="Ingrese un titulo para la imagen (máx 4 palabras)">
            </input>
            <textarea
              v-model="imageDescription"
              class="form-control"
              id="imageUploadDescription"
              rows="3"
              placeholder="Describa en máximo 100 carácteres la imagen"
            ></textarea>

            <!-- <form @submit.prevent="submitForm"> -->
            <div class="mb-3">
              <label for="imageInput" class="label"
                >Seleccionar un archivo:</label
              >
              <input
                type="file"
                class="form-control"
                id="imageInputManual"
                ref="imageInputManual"
                accept="image/*"
                @change="handleFileUpload"
              />
            </div>
          </div>

          <div class="form-group generateKitIA">
            <label class="label" for="exampleFormControlTextarea1"
              >Generar con inteligencia artificial</label
            >
            <textarea
              v-model="aiPrompt"
              class="form-control"
              id="textAreaGenerateWithAI"
              rows="3"
              placeholder="Describa en máximo 400 palabras la imagen que quiere generar."
            ></textarea>

            <!-- <form @submit.prevent="submitForm"> -->
            <div class="mb-3">
              <label for="imageInput" class="label"
                >Seleccionar una imagen de referencia (Opcional):</label
              >
              <input
                type="file"
                class="form-control"
                id="imageInput"
                ref="imageInput"
                accept="image/*"
              />
            </div>
            <!-- </form> -->

            <button
              type="button"
              class="btn btn-primary btnGenerateKit"
              @click="generateImageOpenAI()"
            >
              Generar con IA
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary btnGenerateKit"
      @click="assignImages()"
    >
      Asignar imágenes
    </button>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { computed } from "vue";

import { useUserStore } from "../../stores/userStore.js";
import {
  getKitByIdController,
  getKitsController,
  generateImageWithAIController,
  getKitsImagesController,
  updateKitImagesController,
  uploadImageController,
} from "../../controllers/kitsController";
import axios from "axios";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      logIn: true,
      kit: { title: "Provisional" },
      totalCards: 10, // Suponiendo que tienes  10 tarjetas en total
      cardsToShow: 3, // Inicialmente mostramos  3 tarjetas
      loadedCards: 3, // Inicialmente cargamos  3 tarjetas
      kitsImages: [],
      selectedImages: [],
      inMiddle: true,
    };
  },
  setup() {
    const store = useUserStore();
    const valueRes = computed(() => {
      return store.getUser;
    });

    const user = valueRes.value;
    return { user };
  },
  async created() {
    await this.getKit();
    await this.getKitsImages();
  },
  methods: {
    async assignImages() {
      if (this.selectedImages.length > 0) {
        //Proceso para extraer los ids
        const idKitsToSave = this.selectedImages.map((image) => {
          return image.metadata[0].id;
        });

        const res = await updateKitImagesController(this.kit.id, idKitsToSave);
        await this.$swal({
          title: "¡Se ha creado el kit y asignado las imágenes correctamente!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        });

        this.$router.push("/admin/manageKits");
      } else {
        await this.$swal({
          title: "¡Ha ocurrido un problema, por favor, intenta nuevamente!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      }
    },
    selectKitImage(image) {
      //Antes comprueba si dicho elemento ya está dentro del arreglo
      const isInTheArray = this.selectedImages.includes(image);
      if (!isInTheArray) {
        this.selectedImages.push(image);
      }
      this.needsToBeInMiddle();
    },
    needsToBeInMiddle() {
      if (this.selectedImages.length < 1) {
        this.inMiddle = true;
      } else {
        this.inMiddle = false;
      }
    },
    deleteKitImage(image) {
      let arrayWithoutSelectedImage = this.selectedImages.filter(
        (element) => element !== image
      );
      this.selectedImages = arrayWithoutSelectedImage;
      this.needsToBeInMiddle();
    },
    async getKitsImages() {
      var res = await getKitsImagesController();
      this.kitsImages = res;
      this.kitsImages.reverse();
      this.totalCards = this.kitsImages.length;
    },
    async refreshKitsImages() {
      var res = await getKitsImagesController();
      this.kitsImages.reverse();
      this.kitsImages.push(res[res.length - 1]);
      this.kitsImages.reverse();
      this.totalCards = this.kitsImages.length;
    },
    async getKit() {
      try {
        const idToSearch = this.$route.params.kitId;
        const kit = await getKitByIdController(idToSearch);
        if (!kit) {
          throw new Error("Unable to find kit");
        }
        this.kit = kit;
        // this.user = Object.assign({}, user);
      } catch (error) {
        console.error("Unable to find kit:", error);
        throw error;
      }
    },
    async generateImageOpenAI() {
      try {
        this.$swal.fire({
          title: "Cargando...",
          text: "Por favor, espera mientras se genera la imágen.",
          allowOutsideClick: false,
          showConfirmButton: false, // Oculta el botón de confirmación
          confirmButtonText: false, // Asegura que no haya texto en el botón de confirmación
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await generateImageWithAIController(
          this.aiPrompt,
          this.user.id
        );
        console.log("response imagen generada: ", response);
        this.refreshKitsImages();
        console.log("this.kitsImages: ", this.kitsImages);
        // Oculta el mensaje de carga
        this.$swal.close();
      } catch (error) {
        console.error("Error al generar imagen:", error);
      }
    },
    async handleFileUpload(event) {
      console.log(`The metadata is : ${this.imageTitle} ${this.imageDescription}`)
      const file = event.target.files[0];
      if (file) {
        try {
          this.$swal.fire({
            title: "Cargando...",
            text: "Por favor, espera mientras se sube la imágen.",
            allowOutsideClick: false,
            showConfirmButton: false, // Oculta el botón de confirmación
            confirmButtonText: false, // Asegura que no haya texto en el botón de confirmación
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          const response = await uploadImageController(file, this.user.id, this.imageTitle, this.imageDescription);
          console.log("imagen subida: ", response);
          this.getKitsImages();
          // Restablece los campos de título, descripción y el input de archivo
          this.imageTitle = '';
          this.imageDescription = '';
          this.$refs.imageInput.value = '';
          // Oculta el mensaje de carga
          this.$swal.close();
        } catch (error) {
          console.error("Error al subir imagen:", error);
        }
      }
    },
  },
};
</script>

<style>
.showInformationLeft {
  background-color: rgba(214, 198, 27, 0.1);
  height: fit-content;
  padding: 10px;

  display: flex;
}

.showDataKit {
  width: 50%;
}

.cardKitInformation {
  margin: 0px 20px 10px 20px;
  padding: 8px;
}

.imagesSelector {
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: rgb(250, 250, 242);
}

.imagesSelectorMiddle {
  display: flex;
  flex-direction: column;
  justify-content: center !important;
}

.cardsSelectedImages {
  width: 100%;
  height: 10px;
}
</style>
