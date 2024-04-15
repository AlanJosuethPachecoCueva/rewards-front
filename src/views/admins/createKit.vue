<script>
import { generateKitWithAIController, createKitController } from "../../controllers/kitsController.js";
import { useUserStore } from "../../stores/userStore.js"

//Alertas
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  data() {
    return {
      name: null,
      description: null,
      // email: null,
      slogans: null,
      initialDate: null,
      formattedInitialDate: null,
      finalDate: null,
      formattedFinalDate: null,
      //emailRules: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Valid Email Match
      errors: [],
      nameTouched: false, // Indica si el usuario ha interactuado con el campo de nombre
      descriptionTouched: false,
      initialDateTouched: false,
      finalDateTouched: false,
      //emailTouched: false, // Indica si el usuario ha interactuado con el campo de email
      slogansTouched: false, // Indica si el usuario ha interactuado con el campo de título de trabajo
      aiPrompt: null,
      animate: false,
    };
  },
  components: {
    VueSweetalert2,
  },
  computed: {
    nameValid() {
      return this.nameTouched ? this.name && this.name.length >= 4 : true;
    },
    descriptionValid() {
      return this.descriptionTouched ? this.description && this.description.length > 10 : true;
    },
    // emailValid() {
    //   return this.emailTouched ? this.email && this.emailRules.test(this.email) : true;
    // },
    slogansValid() {
      return this.slogansTouched ? this.slogans && this.slogans.length > 10 : true;
    },
    initialDateValid() {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const selectedDateObj = new Date(this.initialDate);
      selectedDateObj.setDate(selectedDateObj.getDate() + 1); // Suma un día a la fecha actual
      selectedDateObj.setHours(0, 0, 0, 0);


      var isPrevious = false;
      if (selectedDateObj < currentDate) {
        isPrevious = true;
      }
      return this.initialDateTouched ? this.initialDate && !isPrevious : true;
    },
    finalDateValid() {
      var initialDateObj = new Date(this.initialDate);
      initialDateObj.setDate(initialDateObj.getDate() + 1); // Suma un día a la fecha actual

      const finalDateObj = new Date(this.finalDate);
      finalDateObj.setDate(finalDateObj.getDate() + 1); // Suma un día a la fecha actual

      var isPrevious = false;
      if (finalDateObj <= initialDateObj) {
        isPrevious = true;
      }

      return this.finalDateTouched ? this.finalDate && !isPrevious : true;
    }
  },

  methods: {
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
            images: [],
            mainImageUrl: "",
            title: this.name,
            slogans: this.slogans
          }
          const kitId = await createKitController(kit);



          await this.$swal({
            title: "¡El kit ha sido creado con éxito!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          });

          // this.$router.push("/createKitMaterial");
          this.$router.push({ name: "createKitMaterial", params: { kitId } });
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
  }
};
</script>

<template>
  <div class="bigContainerKit">
    <h2>Nuevo Material Publicitario</h2>
    <div class="createKitContainer">
      <div class="createKitContainerLeft">
        <div class="containerLeft">
          <form id="formCreateKit" @submit.prevent="checkForm" action="" method="post">
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
                :class="{ 'is-invalid': nameTouched && !nameValid, 'animate-border': animate }"
                placeholder="Ingrese el nombre del material publicitario" id="name" v-model="name"
                @blur="nameTouched = true">
            </div>
            <div class="form-group group">
              <label class="label" for="description">Descripción</label>
              <textarea class="form-control"
                :class="{ 'is-invalid': descriptionTouched && !descriptionValid, 'animate-border': animate }" rows="3"
                placeholder="Ingrese una descripción para su material publicitario" id="description"
                v-model="description" @blur="descriptionTouched = true"></textarea>
            </div>

            <!-- <div class="form-group group">
              <label class="label" for="email">Email address</label>
              <input type="text" class="form-control" :class="{ 'is-invalid': emailTouched && !emailValid }"
                placeholder="Enter email" id="email" v-model="email" @blur="emailTouched = true">
            </div> -->

            <div class="form-group group">
              <label class="label" for="slogans">Slogans</label>
              <textarea class="form-control"
                :class="{ 'is-invalid': slogansTouched && !slogansValid, 'animate-border': animate }" rows="3"
                placeholder="Cada slogan debe estar separado por el símbolo '|'" id="slogans" v-model="slogans"
                @blur="slogansTouched = true"></textarea>
            </div>

            <div class="form-group group">
              <label for="datePicker" class="label">Fecha inicio</label>
              <input type="date" class="form-control" :class="{ 'is-invalid': initialDateTouched && !initialDateValid }"
                @blur="initialDateTouched = true" id="datePicker" v-model="initialDate">
            </div>

            <div class="form-group group">
              <label for="datePicker" class="label">Fecha fin</label>
              <input type="date" class="form-control" id="datePicker"
                :class="{ 'is-invalid': finalDateTouched && !finalDateValid }" @blur="finalDateTouched = true"
                v-model="finalDate">
            </div>

            <button type="submit" class="btn btn-primary mb-3 btnGenerateKit"
              :style="{ 'margin-left': 10 + '%' }">Crear</button>

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
</template>

<style>
.errorsContainer {
  width: 100%;
  display: flex;
  justify-content: left;
  padding-left: 10%;
}

.animate-border {
  animation: border-change 1s forwards;
}

@keyframes border-change {
  0% {
    /* border-color: #007bff; Color inicial */
  }

  50% {
    border: 2px solid #72e78d;
    /* Color intermedio */
  }

  100% {
    border: 2px solid #00ff3c;
    /* Color final */
  }
}


#description {
  height: 100px;
}

.bigContainerKit {
  padding: 8px;
  text-align: center;
}

.createKitContainer {
  display: flex;
  /* background-color: red; */
}

.createKitContainerLeft {
  width: 55%;
  /* height: 100vh; */
  /* background-color: rgb(19, 148, 12); */

  margin-top: 30px;
  border-right: 1px solid orange;
}

.createKitContainerRight {
  margin-top: 30px;
  width: 45%;
  /* height: 100vh; */
  /* background-color: rgb(48, 110, 217); */

  display: flex;
  justify-content: center;
  align-items: center;
}

.cardContainer {
  width: 80% !important;
  height: fit-content !important;
  /* height: 70% !important; */


  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.generateKitIA {
  background-color: rgba(222, 178, 111, 0.1);
  width: 90% !important;
  height: fit-content !important;
  /* height: 75% !important; */


  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 3% 5% 3%;
  margin: 5% 0% 5% 0%;
}

#textAreaGenerateWithAI {
  height: 250px;
}

.containercontainerLeft {
  display: flex;
  justify-content: left;
  /* background-color: aquamarine; */
}

.group {
  display: flex;
  flex-direction: column;
  align-items: start;
  /* background-color: blueviolet; */
  width: 100% !important;
  padding-left: 10%;
  padding-right: 10%;
}

.label {
  padding: 8px;
}

#formCreateKit {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.btnGenerateKit {

  margin-top: 10px;
}
</style>
