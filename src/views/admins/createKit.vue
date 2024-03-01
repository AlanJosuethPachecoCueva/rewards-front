<!-- <script>
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
 data() {
    return {
      name: null,
      email: null,
      job_title: null,
      emailRules: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Valid Email Match
      errors: [],
    };
 },
 computed: {
    nameValid() {
      return this.name && this.name.length >= 4;
    },
    emailValid() {
      return this.email && this.emailRules.test(this.email);
    },
    jobTitleValid() {
      return this.job_title && this.job_title.length > 0;
    },
 },
 methods: {
    checkForm() {
      this.errors = [];
      if (!this.nameValid) this.errors.push("Name required.");
      if (!this.emailValid) this.errors.push("Please Enter Correct Email.");
      if (!this.jobTitleValid) this.errors.push("Job Title required.");

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
    <div class="container" style="margin-top:30px">
    <form id="app" @submit.prevent="checkForm" action="" method="post">
        <p v-if="errors.length" class="text-danger">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </p>
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': !emailValid }" placeholder="Enter email" id="email" v-model="email">
        </div>
        <div class="form-group">
            <label for="name">Username:</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': !nameValid }" placeholder="Enter username" id="name" v-model="name">
        </div>
        <div class="form-group">
            <label for="jobtitle">Job Title:</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': !jobTitleValid }" placeholder="Enter job title" id="jobtitle" v-model="job_title">
        </div>
        <button type="submit" class="btn btn-primary mb-3">Submit</button>
    </form>
    </div>
</template>


<style>
/* Estilos personalizados si es necesario */
</style> -->




<script>
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    data() {
 return {
    name: null,
    email: null,
    job_title: null,
    emailRules: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Valid Email Match
    errors: [],
    nameTouched: false, // Indica si el usuario ha interactuado con el campo de nombre
    emailTouched: false, // Indica si el usuario ha interactuado con el campo de email
    jobTitleTouched: false, // Indica si el usuario ha interactuado con el campo de título de trabajo
 };
},
computed: {
 nameValid() {
    return this.nameTouched ? this.name && this.name.length >= 4 : true;
 },
 emailValid() {
    return this.emailTouched ? this.email && this.emailRules.test(this.email) : true;
 },
 jobTitleValid() {
    return this.jobTitleTouched ? this.job_title && this.job_title.length > 0 : true;
 },
},

 methods: {
    checkForm() {
      this.errors = [];
      if (!this.nameValid) this.errors.push("Name required.");
      if (!this.emailValid) this.errors.push("Please Enter Correct Email.");
      if (!this.jobTitleValid) this.errors.push("Job Title required.");

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
    <div class="container" style="margin-top:30px">
       <form id="app" @submit.prevent="checkForm" action="" method="post">
         <p v-if="errors.length" class="text-danger">
           <b>Please correct the following error(s):</b>
           <ul>
             <li v-for="error in errors" :key="error">{{ error }}</li>
           </ul>
         </p>
         <div class="form-group">
           <label for="email">Email address:</label>
           <input type="text" class="form-control" :class="{ 'is-invalid': emailTouched && !emailValid }" placeholder="Enter email" id="email" v-model="email" @blur="emailTouched = true">
         </div>
         <div class="form-group">
           <label for="name">Username:</label>
           <input type="text" class="form-control" :class="{ 'is-invalid': nameTouched && !nameValid }" placeholder="Enter username" id="name" v-model="name" @blur="nameTouched = true">
         </div>
         <div class="form-group">
           <label for="jobtitle">Job Title:</label>
           <input type="text" class="form-control" :class="{ 'is-invalid': jobTitleTouched && !jobTitleValid }" placeholder="Enter job title" id="jobtitle" v-model="job_title" @blur="jobTitleTouched = true">
         </div>
         <button type="submit" class="btn btn-primary mb-3">Submit</button>
       </form>
    </div>
   </template>

   <style></style>
   