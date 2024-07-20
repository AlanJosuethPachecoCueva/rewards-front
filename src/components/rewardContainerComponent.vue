<template>
  <!-- Product section -->
  <section :style="{ backgroundImage: `url(${mainImageUrl})` }">
    <div class="background-filter p-5">
      <div class="container-reward-home my-5 text-white">
        <div class="row gx-0 align-items-center">
          <div class="col-md-6 p-0">
            <img
              class="card-img-top"
              :src="mainImageUrl"
              :alt="title"
              style="max-height: 408px; width: 100%; object-fit: cover"
            />
          </div>
          <div class="col-md-6 p-4">
            <h1 class="display-5 fw-bolder reward-title">{{ title }}</h1>
            <div class="description-reward">{{ description }}</div>
            <div class="d-flex">
              <button class="btn btn-outline-light flex-shrink-0" type="button">
                <i class="bi-cart-fill me-1"></i>
                <a href="/rewards">Ver Premios</a>
              </button>
              <button
                id="btnIsActive"
                class="btn btn-outline-light flex-shrink-0"
                type="button"
              >
                <a>{{ isKitActive() }}</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { isTodayBetweenDatesController } from "@/controllers/kitsController.js";

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
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isKitActive() {
      return isTodayBetweenDatesController(this.startDate, this.endDate) == true
        ? "Campaña Activa"
        : "Campaña Inactiva";
    },
  },
};
</script>

<style>
section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
}

.background-filter {
  position: relative;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.7)
  );
}

.background-filter::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  filter: blur(5px);
  z-index: -1;
}

.container-reward-home {
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Fondo semitransparente para mejorar la legibilidad del texto */
  padding: 0;
  border-radius: 8px;
  position: relative;
  z-index: 1;
}

img.card-img-top {
  border-radius: 8px 0 0 8px; /* Añadir bordes redondeados a la izquierda */
}
.description-reward {
  color: white;
}

.reward-title {
  color: white !important;
}
</style>
