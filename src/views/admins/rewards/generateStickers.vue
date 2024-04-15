<template #addons>
  <div class="bigContainerKit">
    <h2>Generar Stickers</h2>
    <div class="createKitContainer">
      <div id="createStickerContainerLeft">
        <div id="showInformationLeft">
          <img :src="imageSrc" id="stickerImage" class="card-img-top" alt="Sticker generado">
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
              <input type="file" class="form-control" id="imageInput" ref="imageInput" accept="image/*">
            </div>
            <!-- </form> -->

            <button type="button" class="btn btn-primary btnGenerateKit" @click="generateStickerOpenAI()">Generar con
              IA
            </button>
          </div>
        </div>
      </div>

    </div>
    <button type="button" class="btn btn-primary btnGenerateKit" @click="saveStickerInFirebase()">Guardar</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "../../../stores/userStore.js";
import { generateStickerWithAIController, saveStickerController } from "../../../controllers/rewardsController";
import imagenLocal from '@/assets/images/no-photo-thumbnail.jpg';

export default {
  components: {
  },
  data() {
    return {
      logIn: true,
      imageSrc: imagenLocal,
      aiPrompt: "",
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
      const stickerSource = this.imageSrc;
      const userID = this.user.id;
      const prompt = this.aiPrompt;
      const res = await saveStickerController({ stickerUrl: stickerSource, userID, prompt });
      // Oculta el mensaje de carga
      this.$swal.close();

      this.$swal.fire({
        title: '¡Éxito!',
        text: 'Sticker generado correctamente.',
        allowOutsideClick: false,
        showConfirmButton: true,
      });

      this.$router.push("/admin/rewards");
    }
  },
};
</script>

<style>
/* .bigContainerKit{
  margin-left: 10;
} */

#createStickerContainerLeft {
  width: 40%;

  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 80% !important;
  height: 70% !important;
}
</style>
