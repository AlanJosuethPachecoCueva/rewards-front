<template #addons>
  <div class="bigContainerKit">
    <h2>Editar Material Publicitario</h2>
    <div class="createKitContainer">
      <div class="createKitContainerLeft">
        <div class="containerLeft">
          <form id="formEditKit" @submit.prevent="checkForm" action="" method="post">
            <div class="errorsContainer">
              <p v-if="errors.length" class="text-danger">
                <b>Por favor, corrija lo siguiente:</b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
              </p>
            </div>

            <div class="form-group group">
              <label class="label" for="name">Nombre</label>
              <input type="text" class="form-control"
                :class="{ 'is-invalid': !nameValid, 'animate-border': animate }"
                placeholder="edittingKit.title" id="name" v-model="name"
                @blur="nameTouched = true">
            </div>
            <div class="form-group group">
              <label class="label" for="description">Descripción</label>
              <textarea class="form-control"
                :class="{ 'is-invalid': !descriptionValid, 'animate-border': animate }" rows="3"
                placeholder="Ingrese una descripción para su material publicitario" id="description"
                v-model="description" @blur="descriptionTouched = true"></textarea>
            </div>
            <div class="form-group group">
              <label class="label" for="slogans">Slogans</label>
              <textarea class="form-control"
                :class="{ 'is-invalid': !slogansValid, 'animate-border': animate }" rows="3"
                placeholder="Cada slogan debe estar separado por el símbolo '|'" id="slogans" v-model="slogans"
                @blur="slogansTouched = true"></textarea>
            </div>

            <div class="form-group group">
              <label for="datePicker" class="label">Fecha inicio</label>
              <input type="date" class="form-control" :class="{ 'is-invalid': !initialDateValid }"
                @blur="initialDateTouched = true" id="datePicker" v-model="initialDate">
            </div>

            <div class="form-group group">
              <label for="datePicker" class="label">Fecha fin</label>
              <input type="date" class="form-control" id="datePicker"
                :class="{ 'is-invalid': !finalDateValid }" @blur="finalDateTouched = true"
                v-model="finalDate">
            </div>
            <button type="submit" class="btn btn-primary mb-3 btnGenerateKit"
            :style="{ 'margin-left': 10 + '%', }">Editar</button>
          </form>
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
            <button type="button" class="btn btn-primary btnGenerateKit" @click="generateTextOpenAI()">Generar con IA
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bigContainerKit">
    <h2>Asignar Imágenes</h2>
    <div class="createKitContainer">
      <div class="createKitContainerLeft">
        <div class="newShowInformationLeft">
          <h4>Imágenes</h4>
          <p style="text-align: start; padding-left: 2%;">Estos elementos son parte del material</p>
          <div class="newImagesSelector" :class="{ newImagesSelectorMiddle: inMiddle }">
            <div class="newGridContainer">
              <div class="newGridItem" v-for="selectedImage in selectedImages" :key="selectedImage.id">
                <img
                  :src="selectedImage.url"
                  class="newImageCard"
                  alt="I"
                  @click="deleteKitImage(selectedImage)"
                />
              </div>
            </div>
          </div>
        </div>
        <p style="padding-top: 10px;">Haz clic en una imágen para agregarla al material</p>
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
            <label class="label" for="exampleFormControlTextarea1">Subir un diseño creado por mí</label>
            <input
              v-model="imageTitle"
              class="form-control"
              id="imageUploadTitle"
              rows="3"
              placeholder="Ingrese un título para la imagen (máx 4 palabras)"
            />
            <br />
            <textarea
              v-model="imageDescription"
              class="form-control"
              id="imageUploadDescription"
              rows="3"
              placeholder="Describa en máximo 100 caracteres la imagen"
            ></textarea>

            <div class="mb-3">
              <label for="imageInput" class="label">Seleccionar un archivo:</label>
              <input
                type="file"
                class="form-control"
                id="imageInputManual"
                ref="imageInputManual"
                accept="image/*"
                @change="handleFileUpload"
              />
            </div>

            <button type="button" class="btn btn-primary" @click="uploadImage">Subir Imagen</button>
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
  generateKitWithAIController,
  generateImageWithAIController,
  getKitsImagesController,
  updateKitImagesController,
  updateKitController,
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
      //Text fields
      name: null,
      description: null,
      // email: null,
      slogans: null,
      initialDate: null,
      formattedInitialDate: null,
      finalDate: null,
      formattedFinalDate: null,

      errors: [],
      nameTouched: false, // Indica si el usuario ha interactuado con el campo de nombre
      descriptionTouched: false,
      initialDateTouched: false,
      finalDateTouched: false,

      slogansTouched: false, // Indica si el usuario ha interactuado con el campo de título de trabajo
      aiPrompt: null,
      animate: false,
      ///********* */
      selectedFile:null,
      logIn: true,
      edittingKit: { title: "Provisional" },
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
    await this.getKit(this.$route.params.kitID);
    console.log(this.edittingKit)
    this.name =  this.edittingKit.title
    this.description =  this.edittingKit.description
    this.slogans =  this.edittingKit.slogans
    this.initialDate =  this.convertDateToISO(this.edittingKit.startDate)
    this.finalDate =  this.convertDateToISO(this.edittingKit.endDate)
    this.nameValid = true;
    this.descriptionValid = true;
    this.slogansValid = true;
    this.finalDateValid = true;
    this.initialDateValid = true;
    
    await this.getKitsImages(); 
    this.selectedImages = this.kitsImages.filter(
      (image) => this.edittingKit.images.includes(image.metadata[0].id)
    );

  },
  methods: {
    //METHOD FOR EDITING TEXT FIELDS
    getUserId() {
      const store = useUserStore();
      const user = store.getUser;
      return user.id;
    },
    async checkForm() {
      try {
        const selectedDateObj = new Date(this.initialDate);
        selectedDateObj.setDate(selectedDateObj.getDate() + 1); // Suma un día a la fecha actual
        selectedDateObj.setHours(0, 0, 0, 0);
        this.formattedInitialDate = selectedDateObj.toLocaleDateString('en-GB');
        const finalDateObj = new Date(this.finalDate);
        finalDateObj.setDate(finalDateObj.getDate() + 1); // Suma un día a la fecha actual
        this.formattedFinalDate = finalDateObj.toLocaleDateString('en-GB');

        this.errors = [];
        if (!this.nameValid || this.name == null) {
          this.errors.push("Se requiere un nombre válido.");
        }
        if (!this.descriptionValid || this.description == null) {
          this.errors.push("Se requiere una descripción válida.");
        }
        if (!this.slogansValid || this.slogans == null) {
          this.errors.push("Se requiere slogans válidos.");
        }
        if (!this.finalDateValid || this.finalDate == null) {
          this.errors.push("Se requiere una fecha de finaliazación válida.");
        }
        if (!this.initialDateValid || this.initialDate == null) {
          this.errors.push("Se requiere una fecha de inicialización válida.");
        }

        if (this.errors.length === 0) {
          // Procesa el formulario si no hay errores
          const userId = this.getUserId();
          const kit = {
            author: userId,
            description: this.description,
            startDate: this.formattedInitialDate,
            endDate: this.formattedFinalDate,
            title: this.name,
            slogans: this.slogans
          }
          //TODO: EDIT METHOD TO EDIT KIT
          const kitId = await updateKitController(this.edittingKit.id,kit);

          await this.$swal({
            title: "¡El kit ha sido editado con éxito!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          });

          // this.$router.push("/createKitMaterial");
          await this.getKit(this.$route.params.kitID);
        }
      } catch (error) {
        await this.$swal({
          title: "Las sugerencias no se completaron de la manera esperada o ocurrió un error, por favor, vuelve a intentar.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      }

    },
    animateBorder() {
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
      }, 1500);
    },
    async generateTextOpenAI() {

      try {

        // Muestra el mensaje de carga
        this.$swal.fire({
          title: 'Cargando...',
          text: 'Por favor, espera mientras se genera el texto.',
          allowOutsideClick: false,
          showConfirmButton: false, // Oculta el botón de confirmación
          confirmButtonText: false, // Asegura que no haya texto en el botón de confirmación    
        });


        const response = await generateKitWithAIController(this.aiPrompt);
        this.animateBorder();

        // Oculta el mensaje de carga
        this.$swal.close();
        
        this.name = response.title.replace(/"/g, "");
        this.description = response.description.replace(/"/g, "");
        this.slogans = response.slogans.join(' | ');

        
      } catch (error) {
        console.error('Error al generar texto:', error);
      }
    },
    //****************
    async assignImages() {
      if (this.selectedImages.length > 0) {
        //Proceso para extraer los ids
        const idKitsToSave = this.selectedImages.map((image) => {
          return image.metadata[0].id;
        });

        const res = await updateKitImagesController(this.edittingKit.id, idKitsToSave);
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
    convertDateToISO(dateStr) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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
      this.totalCards = this.kitsImages.length;
      console.log('images: ', this.kitsImages)
    },
    async getKit(id) {
      try {
        const kit = await getKitByIdController(id);
        if (!kit) {
          throw new Error("Unable to find kit");
        }
        this.edittingKit = kit;
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
        this.getKitsImages();
        console.log("this.kitsImages: ", this.kitsImages);
        // Oculta el mensaje de carga
        this.$swal.close();
      } catch (error) {
        console.error("Error al generar imagen:", error);
      }
    },
    async handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      if (this.selectedFile  && this.imageTitle && this.imageDescription) {
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
          const response = await uploadImageController(this.selectedFile, this.user.id, this.imageTitle, this.imageDescription);
          console.log("imagen subida: ", response);
          this.getKitsImages();
          // Restablece los campos de título, descripción y el input de archivo
          this.imageTitle = '';
          this.imageDescription = '';
          this.$refs.imageInput.value = '';
          this.selectedFile = null;
          // Oculta el mensaje de carga
          this.$swal.close();
        } catch (error) {
          console.error("Error al subir imagen:", error);
        }
      }else{
        alert("Please fill al the image fields to upload the image")
      }
    },
  },
};
</script>

<style>
.label {
  padding: 8px;
  font-weight: bold;
}
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
.containerLeft {
  width: 100%;
  overflow-y: auto; /* Permite el desplazamiento vertical */
  max-height: calc(3 * (200px + 16px)); /* Calcula la altura máxima para 3 filas, ajusta el tamaño de las imágenes aquí */
}
.containerLeftImages {
  width: 100%;
  padding: 2%;
  background-color: #ffeede;
  border-radius: 10px;
  overflow-y: auto; /* Permite el desplazamiento vertical */
  max-height: calc(3 * (200px + 16px)); /* Calcula la altura máxima para 3 filas, ajusta el tamaño de las imágenes aquí */
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Ajusta el tamaño mínimo de las imágenes aquí */
  grid-auto-rows: 200px; /* Ajusta la altura de las filas aquí */
  gap: 16px; /* Espacio entre las imágenes */
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imageCard {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Asegura que las imágenes cubran el área sin distorsionarse */
  cursor: pointer;
}
.newShowInformationLeft {
  width: 100%;
  padding-top: 2%;
  padding-bottom: 3%;
  padding-inline: 3%;
  background-color: rgb(250, 250, 242);
}

.newImagesSelector {
  overflow-y: auto; /* Permite el desplazamiento vertical */
  max-height: calc(2 * (200px + 16px)); /* Altura máxima para mostrar 2 filas */
}

.newGridContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  grid-auto-rows: 200px; /* Altura de cada fila */
  gap: 16px; /* Espacio entre las imágenes */
}

.newGridItem {
  display: flex;
  justify-content: center;
  align-items: center;
}

.newImageCard {
  width: 100%;
  height: 100%;
  object-fit:cover; /* Asegura que las imágenes cubran el área sin distorsionarse */
  cursor: pointer;
  border-radius: 8px; /* Añade un borde redondeado */
}

.newImageCardTest {
  width: 100%;
  height: 100%;
  object-fit: fill; /* Asegura que las imágenes cubran el área sin distorsionarse */
  cursor: pointer;
  border-radius: 8px; /* Añade un borde redondeado */
}


</style>
