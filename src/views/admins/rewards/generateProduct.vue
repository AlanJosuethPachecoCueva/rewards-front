<template>
  <div class="bigContainerKit">
    <h2>Generar Producto</h2>
    <div class="createKitContainer" id="bigContainerSticker">
      <div id="createStickerContainerLeft">
        <div id="showInformationLeft">
          <img :src="imageSrc" id="stickerImage" class="card-img-top" alt="Sticker generado">
        </div>
        <div class="mb-3">
          <label for="imageInput" class="label">Seleccionar:</label>
          <input type="file" class="form-control" id="imageInput" @change="selectImageFromDevice" ref="imageInput"
            accept="image/*">
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


        </div>
      </div>
      <div class="createKitContainerRight">
        <div class="card cardContainer">
          <div class="form-group generateKitIA">
            <div class="form-group group">
              <label class="label" for="name">Nombre del producto</label>
              <input type="text" class="form-control" :class="{ 'is-invalid': nameTouched && !nameValid }"
                placeholder="Ingrese el nombre del producto" id="name" v-model="name" @blur="nameTouched = true">
            </div>
            <div class="form-group group">
              <label class="label" for="description">Descripción</label>
              <textarea class="form-control" :class="{ 'is-invalid': descriptionTouched && !descriptionValid }" rows="3"
                placeholder="Ingrese una descripción para su sticker" id="description" v-model="description"
                @blur="descriptionTouched = true"></textarea>
            </div>
            <div class="form-group group">
              <label class="label" for="price">Precio aproximado en dólares</label>
              <input type="number" class="form-control" :class="{ 'is-invalid': priceTouched && priceValid }"
                placeholder="Ingrese el precio aproximado en dólares" id="price" v-model="price"
                @blur="priceTouched = true">
            </div>
            <div class="form-group group">
              <label class="label" for="points">Cantidad de puntos</label>
              <input type="number" class="form-control" :class="{ 'is-invalid': pointsTouched && pointsValid }"
                placeholder="Ingrese la cantidad de puntos" id="points" v-model="points" @blur="pointsTouched = true">
            </div>
            <div class="form-group group">
              <label class="label" for="points">Stock disponible</label>
              <input type="number" class="form-control" :class="{ 'is-invalid': stockTouched && stockValid }"
                placeholder="Ingrese la cantidad de productos disponible" id="points" v-model="stock" @blur="stockTouched = true">
            </div>
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
import { saveProductController } from "../../../controllers/rewardsController";
import imagenLocal from '@/assets/images/no-photo-thumbnail.jpg';

export default {
  components: {
  },
  data() {
    return {
      logIn: true,
      imageSrc: imagenLocal,
      aiPrompt: "",
      file: null,
      name: "",
      description: "",
      nameTouched: false,
      descriptionTouched: false,
      errors: [],
      price: "",
      points: "",
      priceTouched: false,
      pointsTouched: false,
      priceValid: true,
      pointsValid: true,
      stock: 0,
      stockValid: true,
      stockTouched: false,
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
    nameValid() {
      return this.nameTouched ? this.name && this.name.length >= 4 : true;
    },
    descriptionValid() {
      return this.descriptionTouched ? this.description && this.description.length > 10 : true;
    },
    priceValid() {
      return this.priceTouched ? this.price && this.price > 0 : true;
    },
    pointsValid() {
      return this.pointsTouched ? this.points && this.points > 0 : true;
    },
    stockValid() {
      return this.stockTouched ? this.stock && this.stock > 0 : true;
    },
    async selectImageFromDevice(event) {
      this.file = event.target.files[0];
      if (this.file) {
        let url = URL.createObjectURL(this.file);
        this.imageSrc = url;
      }
    },
    async saveProductInFirebase() {
      this.$swal.fire({
        title: 'Cargando...',
        text: 'Por favor, espera mientras se guarda el producto.',
        allowOutsideClick: false,
        showConfirmButton: false, // Oculta el botón de confirmación
        confirmButtonText: false, // Asegura que no haya texto en el botón de confirmación
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const userId = this.user.id;
      let res;

      //Si la imagen se subió desde un medio local
      const image = this.file;
      const description = this.description;
      const name = this.name
      const price = this.price;
      const costInPoints = this.points;
      const stock = this.stock;

      res = await saveProductController({ name, description, price, costInPoints, userId, image, stock });
      console.warn("Res al guardar producto: ", res)

      // Oculta el mensaje de carga
      this.$swal.close();


      //this.$router.push("/admin/rewards");
      console.log("res push: ", res);
      const rewardId = "pr-" + res.image;
      console.log("rewardId mod: ", rewardId);
      await this.$swal.fire({
        title: '¡Éxito!',
        text: 'Producto generado correctamente.',
        allowOutsideClick: false,
        showConfirmButton: true,
      });
      this.$router.push({ name: "assignRewardTokit", params: { rewardId } });
    },
    async checkForm() {
      try {

        this.errors = [];
        if (!this.nameValid || this.name == null) {
          this.errors.push("Se requiere un nombre válido.");
        }
        if (!this.descriptionValid || this.description == null) {
          this.errors.push("Se requiere una descripción válida.");
        }
        if (!this.pointsValid || this.points == null) {
          this.errors.push("La precio en puntos debe ser mayor que cero.");
        }
        if (!this.priceValid || this.description == null) {
          this.errors.push("El precio debe ser mayor que cero.");
        }

        //const res = await this.saveProductInFirebase();

        if (this.errors.length === 0) {
          await this.saveProductInFirebase();
        } else {
          await this.$swal({
            title: "¡Ocurrió un error!",
            text: "Por favor, solucione todas las sugerencias antes de continuar.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }

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
