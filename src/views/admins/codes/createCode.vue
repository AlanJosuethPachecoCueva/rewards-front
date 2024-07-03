<template>
  <div class="background-image"> <!-- Aplica el estilo background-image aquí -->
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" :style="{ backgroundColor: secondaryColor }">
              <h3>{{ $t("createCode") }}</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="generateCode">
                <div class="mb-3">
                  <label for="name" class="form-label">{{ $t("createCodeName") }}</label>                                
                  <input type="text" class="form-control" id="name" v-model="form.name" required>
                </div>
                
                <div class="mb-3">
                  <label for="quantity" class="form-label">{{ $t("createCodeQuantity") }}</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="quantity" v-model="form.quantity" required>
                    <button class="btn btn-outline-secondary" type="button" @click="increment('quantity')">+</button>
                    <button class="btn btn-outline-secondary" type="button" @click="decrement('quantity')">-</button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="points" class="form-label">{{ $t("createCodeScores") }}</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="points" v-model="form.points" required>
                    <button class="btn btn-outline-secondary" type="button" @click="increment('points')">+</button>
                    <button class="btn btn-outline-secondary" type="button" @click="decrement('points')">-</button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="startDate" class="form-label">{{ $t("createCodeStartDate") }}</label>
                  <input type="date" class="form-control" id="startDate" v-model="form.startDate" required>
                </div>
                <div class="mb-3">
                  <label for="endDate" class="form-label">{{ $t("createCodeEndDate") }}</label>
                  <input type="date" class="form-control" id="endDate" v-model="form.endDate" required>
                </div>
                <div class="mb-3">
                  <label for="kit" class="form-label">{{ $t("createCodeAssociateMaterial") }}</label>
                  <multiselect v-model="form.selectedKits" :options="kits" label="title" track-by="id" :multiple="true" mode="tags" placeholder="Selecciona los kits"></multiselect>
                </div>
                <div class="mb-3">
                  <label for="product" class="form-label">{{ $t("createCodeAssociateProduct") }}</label>
                  <input type="text" class="form-control" id="product" v-model="form.product">
                </div>
                <button type="submit" :style="{ backgroundColor: buttonColor }" class="btn btn-success">{{ $t("createCodeSaveButton") }}</button>
                <button type="button" class="btn btn-danger" @click="clearForm">{{ $t("createCodeCancelButton") }}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { colors } from "/src/assets/colors.js";
import { getKitsController, getImagesFromKitsController } from "@/controllers/kitsController";
import { saveMultipleCodesController } from "@/controllers/codesController";
import multiselect from 'vue-multiselect'
import fondoCacao2 from "@/assets/images/fondoCacao2.jpeg"; // Importa la imagen

export default {
    components: { multiselect },
    data() {
        return {
            form: {
                name: '',
                quantity: 0,
                points: 0,
                startDate: '',
                endDate: '',
                product: '',
                selectedKits: [], // Para almacenar los IDs de los kits seleccionados
                
            },
            kits: [],
            secondaryColor: colors.darkBrown,
            buttonColor: colors.principalBrown,
            fondoCacao2, // Agrega la imagen a los datos

        };
    },
    async mounted() {
        this.kits = await getKitsController();
        // this.kits = await getImagesFromKitsController(this.kits);
        console.log("this.kits in create code: ", this.kits);
    },
    methods: {
        formatOption(option) {
            return option.title; // Muestra el título en la lista
        },
        increment(field) {
            this.form[field]++;
        },
        decrement(field) {
            if (this.form[field] > 0) this.form[field]--;
        },
        clearForm() {
            this.form = {
                name: '',
                quantity: 0,
                points: 0,
                startDate: '',
                endDate: '',
                product: ''
            };
        },
        async generateCode() {
            this.form.selectedKits = this.form.selectedKits.map(kit => kit.id);
            console.log("form: ", this.form);

            const resultQuestion = await this.$swal({
                title: '¿Deseas generar ' + this.form.quantity + ' códigos?',
                text: 'Se creará la cantidad especificada de códigos y se enlazarán con todos los kits publicitarios indicados',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: "No",
            });
            if (!resultQuestion.isConfirmed) {
                await this.$swal({
                    title: 'No se han generado los códigos',
                    text: "Ningún código ha sido generado.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            } else {
                const res = await saveMultipleCodesController(this.form);
                console.log("res en crear multiples: ", res);
                if (res.status) {
                    await this.$swal({
                        title: '¡Códigos generados correctamente!',
                        text: "Los códigos y sus enlaces con los kits han sido generados correctamente.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    let generatedCodes = res.codeIds;
                    console.log("generatedCodes: ", generatedCodes);
                    this.$router.push({
                        name: "viewGeneratedCodes",
                        params: { generatedCodes: JSON.stringify(generatedCodes) },
                    });
                    // this.$router.push({ name: 'viewGeneratedCodes', params: { generatedCodes } })
                } else {
                    await this.$swal({
                        title: 'No se han generado los códigos',
                        text: "Ha ocurrido un error y no se han generado los códigos.",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    return;
                }

            }
        }
    }
};
</script>





<style scoped>

.background-image {
  background: url(@/assets/images/fondoCacao2.jpeg) no-repeat center center fixed;
  background-size: cover;
  height: 100vh; /* Asegura que ocupe toda la altura de la vista */
  display: flex;
  align-items: center; /* Centra verticalmente el contenido */
}

.container {
    margin-top: 50px;
}

.card-header {
    color: #fff;
}

.btn-outline-secondary {
    min-width: 40px;
    text-align: center;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    appearance: inherit;
    -moz-appearance: textfield;
}
</style>
