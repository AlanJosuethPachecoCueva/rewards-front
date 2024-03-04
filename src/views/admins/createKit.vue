<script>
// import 'bootstrap/dist/css/bootstrap.min.css';
import createKitComponent from "@/components/admin/createKitComponent.vue";
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
    };
  },
  components: {
    createKitComponent,
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
      this.formattedSelectedDate = selectedDateObj.toLocaleDateString('en-GB');
      console.log("----Inicial");
      console.log("currentDate: ", currentDate);
      console.log("selectedDateObj: ", selectedDateObj);

      var isPrevious = false;
      if (selectedDateObj < currentDate) {
        isPrevious = true;
      }
      return this.initialDateTouched ? this.initialDate && !isPrevious : true;
    },
    finalDateValid(){
      var initialDateObj = new Date(this.initialDate);
      initialDateObj.setDate(initialDateObj.getDate() + 1); // Suma un día a la fecha actual

      const finalDateObj = new Date(this.finalDate);
      finalDateObj.setDate(finalDateObj.getDate() + 1); // Suma un día a la fecha actual
      console.log("----Final");
      console.log("initialDateObj: ", initialDateObj);
      console.log("finalDateObj: ", finalDateObj);

      var isPrevious = false;
      if (finalDateObj <= initialDateObj) {
        isPrevious = true;
      }

      return this.finalDateTouched ? this.finalDate && !isPrevious : true;
    }
  },

  methods: {
    checkForm() {
      this.errors = [];
      if (!this.nameValid) this.errors.push("Name required.");
      if (!this.descriptionValid) this.errors.push("Description required.");
      // if (!this.emailValid) this.errors.push("Please Enter Correct Email.");
      if (!this.slogansValid) this.errors.push("Slogans required.");

      if (this.errors.length === 0) {
        // Procesa el formulario si no hay errores
        console.log("Formulario enviado");
        // Aquí puedes agregar la lógica para procesar el formulario
      }
    },

  },
};
</script>

<template>
  <div class="bigContainerKit">
    <h2>Nuevo Material Publicitario</h2>
    <div class="createKitContainer">
      <div class="createKitContainerLeft">
        <div class="containerLeft">
          <form id="formCreateKit" @submit.prevent="checkForm" action="" method="post">
            <p v-if="errors.length" class="text-danger">
              <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
            <div class="form-group group">
              <label class="label" for="name">Nombre</label>
              <input type="text" class="form-control" :class="{ 'is-invalid': nameTouched && !nameValid }"
                placeholder="Ingrese el nombre del material publicitario" id="name" v-model="name"
                @blur="nameTouched = true">
            </div>
            <div class="form-group group">
              <label class="label" for="description">Descripción</label>
              <textarea class="form-control" :class="{ 'is-invalid': descriptionTouched && !descriptionValid }" rows="3"
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
              <textarea class="form-control" :class="{ 'is-invalid': slogansTouched && !slogansValid }" rows="3"
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
              <input type="date" class="form-control" id="datePicker" :class="{ 'is-invalid': finalDateTouched && !finalDateValid }"
                @blur="finalDateTouched = true" v-model="finalDate">
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
            <textarea class="form-control" id="textAreaGenerateWithAI" rows="3"
              placeholder="Describa en máximo 400 palabras de que trata la campaña, el enfoque que debe tener; el público objetivo (Edad, género y ubicación geográfica de su audiencia), características del producto.
            - Beneficios clave que ofrece el producto.
            - ¿Cuál es el problema que resuelve el producto?
            - ¿Cuál es el propósito principal de la campaña? (aumentar ventas, conciencia de marca, lanzamiento de un nuevo producto, etc.)"></textarea>
            <button type="button" class="btn btn-primary btnGenerateKit">Generar con IA </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
