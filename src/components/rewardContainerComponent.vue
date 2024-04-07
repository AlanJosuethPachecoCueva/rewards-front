<script>
// import { computed } from "vue";
// import { colors } from "../assets/colors.js";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImageUrl: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    goHome() {
      this.$router.push("/");
    },
    handleContacts() {},
  },
  mounted() {},
};
</script>

<template>
  <!-- Product section-->
  <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img
            class="card-img-top mb-5 mb-md-0"
            :src="mainImageUrl"
            :alt="title"
            style="max-height: 408px;"
          />
        </div>
        <div class="col-md-6">
          <!-- <div class="small mb-1">SKU: BST-498</div> -->
          <h1 class="display-5 fw-bolder">{{title}}</h1>
          <!-- <div class="fs-5 mb-5">
            <span class="text-decoration-line-through">$45.00</span>
            <span>$40.00</span>
          </div> -->
          <p class="lead">
            {{ description }}
          </p>
          <div class="d-flex">
            <!-- <input
              class="form-control text-center me-3"
              id="inputQuantity"
              type="num"
              value="1"
              style="max-width: 3rem"
            /> -->
            <button class="btn btn-outline-dark flex-shrink-0" type="button">
              <i class="bi-cart-fill me-1"></i>
              Ver Premios
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
