<template #addons>
  <div class="bigContainerKit">

    <h2>Generar Stickers</h2>
    <div class="createKitContainer" id="bigContainerSticker">
      <div id="createStickerContainerLeft">
        <div id="showInformationLeft">
          <img :src="imageSrc" id="stickerImage" class="card-img-top" alt="Sticker generado">
        </div>
        <div :class="{ 'hideIfAI': !isLocalImageSticker, 'showIfManual': isLocalImageSticker }">
          <div class="errorsContainer">
            <p v-if="errors.length" class="text-danger">
              <b>Por favor, corrija lo siguiente:</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
          </div>

          <div class="form-group group">
            <label class="label" for="name">Título</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': titleTouched && !titleValid }"
              placeholder="Ingrese el título del sticker" id="title" v-model="title" @blur="titleTouched = true">
          </div>
          <div class="form-group group">
            <label class="label" for="description">Descripción</label>
            <textarea class="form-control" :class="{ 'is-invalid': descriptionTouched && !descriptionValid }" rows="3"
              placeholder="Ingrese una descripción para su sticker" id="description" v-model="description"
              @blur="descriptionTouched = true"></textarea>
          </div>
        </div>

      </div>
      <div class="createKitContainerRight">
        <div class="card cardContainer">
          <div class="form-group generateKitIA">
            <label class="label" for="exampleFormControlTextarea1">Generar con inteligencia artificial</label>
            <textarea v-model="aiPrompt" class="form-control" id="textAreaGenerateWithAI" rows="3"
              placeholder="Describa en máximo 400 palabras la imagen que quiere generar."></textarea>

            <!-- <form @submit.prevent="submitForm"> -->
            <div class="mb-3">
              <label for="imageInput" class="label">O seleccionar del almacenamiento:</label>
              <input type="file" class="form-control" id="imageInput" @change="selectImageFromDevice" ref="imageInput"
                accept="image/*">
            </div>
            <!-- </form> -->

            <button type="button" class="btn btn-primary btnGenerateKit" @click="generateStickerOpenAI()">Generar con
              IA
            </button>
          </div>
        </div>
      </div>

    </div>
    <button type="button" class="btn btn-primary btnGenerateKit" @click="checkForm()">Guardar</button>
  </div>

</template>

<script>
import { computed } from "vue";
import { useUserStore } from "../../../stores/userStore.js";
import { generateStickerWithAIController, saveStickerController, saveStickerByFileController } from "../../../controllers/rewardsController";
import imagenLocal from '@/assets/images/no-photo-thumbnail.jpg';

export default {
  components: {
  },
  data() {
    return {
      logIn: true,
      imageSrc: imagenLocal,
      aiPrompt: "",
      isLocalImageSticker: false,
      file: null,
      title: "",
      description: "",
      titleTouched: false,
      descriptionTouched: false,
      errors: [],
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
  },
  methods: {
    titleValid() {
      return this.titleTouched ? this.title && this.title.length >= 4 : true;
    },
    descriptionValid() {
      return this.descriptionTouched ? this.description && this.description.length > 10 : true;
    },
    async selectImageFromDevice(event) {
      console.log("event selected: ", event);
      this.file = event.target.files[0];
      console.log("file selected: ", this.file);
      if (this.file) {
        let url = URL.createObjectURL(this.file);
        console.log("url file selected: ", url);
        // Crear una URL de objeto para la imagen seleccionada
        this.imageSrc = url;
        this.isLocalImageSticker = true;
      }
    },
    async generateStickerOpenAI() {
      try {
        this.$swal.fire({
          title: 'Cargando...',
          text: 'Por favor, espera mientras se genera el sticker.',
          allowOutsideClick: false,
          showConfirmButton: false, // Oculta el botón de confirmación
          confirmButtonText: false, // Asegura que no haya texto en el botón de confirmación
        });

        const response = await generateStickerWithAIController(this.aiPrompt, this.user.id);
        this.imageSrc = response;
        // Oculta el mensaje de carga
        this.$swal.close();
        this.isLocalImageSticker = false;
      } catch (error) {
        console.error('Error al generar imagen:', error);
      }
    },
    async saveStickerInFirebase() {
      this.$swal.fire({
        title: 'Cargando...',
        text: 'Por favor, espera mientras se guarda el sticker.',
        allowOutsideClick: false,
        showConfirmButton: false, // Oculta el botón de confirmación
        confirmButtonText: false, // Asegura que no haya texto en el botón de confirmación
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const userID = this.user.id;
      let res;
      if (!this.isLocalImageSticker) {
        //Si es generada por IA hace este procedimiento
        const stickerSource = this.imageSrc;

        const prompt = this.aiPrompt;
        res = await saveStickerController({ stickerUrl: stickerSource, userID, prompt });
        console.warn("Res al guardat sticker: ", res)
      } else {
        //Si la imagen se subió desde un medio local
        const image = this.file;
        const title = this.title;
        const description = this.description;
        res = await saveStickerByFileController({ image, title, description, userID });
        console.warn("Res al guardat sticker local: ", res)
      }

      // Oculta el mensaje de carga
      this.$swal.close();

      
      //this.$router.push("/admin/rewards");
      console.log("res push: ", res);
      const rewardId = "st-"+res.response.response.fileName;
      console.log("rewardId mod: ", rewardId);
      await this.$swal.fire({
        title: '¡Éxito!',
        text: 'Sticker generado correctamente.',
        allowOutsideClick: false,
        showConfirmButton: true,
      });
      this.$router.push({ name: "assignRewardTokit", params: { rewardId } });
    },
    async checkForm() {
      try {

        this.errors = [];
        if (!this.titleValid || this.title == null) {
          this.errors.push("Se requiere un título válido.");
        }
        if (!this.descriptionValid || this.description == null) {
          this.errors.push("Se requiere una descripción válida.");
        }

        const res = await this.saveStickerInFirebase();
      } catch (error) {
        console.error(error);
      }
    }

  },
};
</script>

<style>
#bigContainerSticker {
  display: flex;
  justify-content: center;
}

#createStickerContainerLeft {
  width: 40%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#showInformationLeft {
  background-color: rgba(214, 198, 27, 0.1);
  height: fit-content;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}

#stickerImage {
  width: 70% !important;
  height: 55% !important;


  min-width: 355px;
}

.hideIfAI {
  display: none;
}

.showIfManual {
  width: 100%;
  padding-bottom: 10px;
}
</style>
