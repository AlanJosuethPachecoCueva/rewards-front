<script>
import rewardContainerComponent from "@/components/rewardContainerComponent.vue";
import { getKitsController } from "@/controllers/kitsController";
export default {
  components: {
    rewardContainerComponent,
  },
  data() {
    return {
      logIn: true,
      kits: [],
      // cardItem:{
      //   title: "Sinfonía del placer P1",
      //   description:"Sumérgete en la exquisita sinfonía de placer con el nuevo Chocolate Dimple. Nuetra campaña 'Sinfonía de Placer' celebra la experiencia única que ofrece cada bocado de este delicioso chocolate.",
      //   mainImageUrl: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2FCamp1.webp?alt=media&token=c7fc8523-4d91-41a7-a5dc-63584f8100bc",
      //   images:[
      //     "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2Fcamp2.webp?alt=media&token=a7f7c59c-abb7-482e-a10e-3400abd8d6eb",
      //     "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2Fcamp3.webp?alt=media&token=9eda9980-615b-43e0-a263-519275f41a10",
      //     "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/kitImages%2Fcamp4.webp?alt=media&token=82f4c906-4c8e-4490-8607-b6e11ec4905d"
      //   ]
      // }
    };
  },
  methods: {
    // async chargekits() {
    //   kits = await getKitsController();
    // },
  },
  async mounted() {
    this.kits = await getKitsController();
  },
};
</script>

<template>
  <!-- <div class="text-center m-4">
    <h1>Gestionar Material Publicitario</h1>
  </div> -->
  <div class="bg-default">
    <div class="main-content">
      <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
        <div class="container-fluid">
          <h2 class="mb-5 text-white">Stats Card</h2>
          <div class="header-body">
            <div class="row">
              <div class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Traffic
                        </h5>
                        <span class="h2 font-weight-bold mb-0">350,897</span>
                      </div>
                      <div class="col-auto">
                        <!-- Este tiene el ícono -->
                        <div
                          class="icon icon-shape bg-danger text-white rounded-circle shadow"
                        >
                          <i
                            class="bi bi-bar-chart-line-fill"
                            style="
                              font-size: 150%;
                              color: #ffffff;
                              font-weight: bold;
                            "
                          ></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-success mr-2"
                        ><i class="fa fa-arrow-up"></i> 3.48%</span
                      >
                      <span class="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          New users
                        </h5>
                        <span class="h2 font-weight-bold mb-0">2,356</span>
                      </div>
                      <div class="col-auto">
                        <!-- Este tiene el ícono -->
                        <div
                          class="icon icon-shape bg-warning text-white rounded-circle shadow"
                        >
                          <i
                            class="bi bi-pie-chart-fill"
                            style="
                              font-size: 150%;
                              color: #ffffff;
                              font-weight: bold;
                            "
                          ></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-danger mr-2"
                        ><i class="fas fa-arrow-down"></i> 3.48%</span
                      >
                      <span class="text-nowrap">Since last week</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Sales
                        </h5>
                        <span class="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <div class="col-auto">
                        <!-- Este tiene el ícono -->
                        <div
                          class="icon icon-shape bg-yellow text-white rounded-circle shadow"
                        >
                          <i
                            class="bi bi-people-fill"
                            style="
                              font-size: 150%;
                              color: #ffffff;
                              font-weight: bold;
                            "
                          ></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-warning mr-2"
                        ><i class="fas fa-arrow-down"></i> 1.10%</span
                      >
                      <span class="text-nowrap">Since yesterday</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Performance
                        </h5>
                        <span class="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <div class="col-auto">
                        <!-- Este tiene el ícono -->
                        <div
                          class="icon icon-shape bg-info text-white rounded-circle shadow"
                        >
                          <i
                            class="bi bi-speedometer2"
                            style="
                              font-size: 150%;
                              color: #ffffff;
                              font-weight: bold;
                            "
                          ></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-success mr-2"
                        ><i class="fas fa-arrow-up"></i> 12%</span
                      >
                      <span class="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Page content -->
    </div>
  </div>
</template>

<style>
@-ms-viewport {
  width: device-width;
}

@media (min-width: 992px) {
  .col-lg-6 {
    max-width: 50%;
    flex: 0 0 50%;
  }
}

@media (min-width: 1200px) {
  .col-xl-3 {
    max-width: 25%;
    flex: 0 0 25%;
  }
  .col-xl-6 {
    max-width: 50%;
    flex: 0 0 50%;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  background-color: #fff;
  background-clip: border-box;
}

.card-body {
  padding: 1.5rem;
  flex: 1 1 auto;
}

.card-title {
  margin-bottom: 1.25rem;
}

@keyframes progress-bar-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}

@media (min-width: 1200px) {
  .justify-content-xl-between {
    justify-content: space-between !important;
  }
}

/* Altura */
.pb-8 {
  padding-bottom: 5rem !important;
}

@media (min-width: 768px) {
  .pt-md-8 {
    padding-top: 5rem !important;
  }
}

@media (min-width: 1200px) {
  .mb-xl-0 {
    margin-bottom: 0 !important;
  }
}

@media print {
  *,
  *::before,
  *::after {
    box-shadow: none !important;
    text-shadow: none !important;
  }
  a:not(.btn) {
    text-decoration: underline;
  }
  p,
  h2 {
    orphans: 3;
    widows: 3;
  }
  h2 {
    page-break-after: avoid;
  }
  @page {
    size: a3;
  }
  body {
    min-width: 992px !important;
  }
}

.bg-yellow {
  background-color: #ffd600 !important;
}

a.bg-yellow:hover,
a.bg-yellow:focus,
button.bg-yellow:hover,
button.bg-yellow:focus {
  background-color: #ccab00 !important;
}

/* Color de fondo backgroundColor */
.bg-gradient-primary {
  background: linear-gradient(87deg, rgb(214, 204, 156) 0, rgb(214, 204, 156)  50%) !important;
}

@keyframes floating-lg {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes floating-sm {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Texto pequeño */
.text-sm {
  font-size: 0.875rem !important;
}

/* Padding de las cartas */
.card-stats .card-body {
  padding: 1rem 1.5rem;
}

@media (min-width: 768px) {
  .main-content .container-fluid {
    padding-right: 39px !important;
    padding-left: 39px !important;
  }
}

/* íconos */
.icon {
  width: 3rem;
  height: 3rem;
}

.icon i {
  font-size: 2.25rem;
}

.icon-shape {
  display: inline-flex;
  padding: 12px;
  text-align: center;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.icon-shape i {
  font-size: 1.25rem;
}

@media (min-width: 768px) {
  @keyframes show-navbar-dropdown {
    0% {
      transition: visibility 0.25s, opacity 0.25s, transform 0.25s;
      transform: translate(0, 10px) perspective(200px) rotateX(-2deg);
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes hide-navbar-dropdown {
    from {
      opacity: 1;
    }
    to {
      transform: translate(0, 10px);
      opacity: 0;
    }
  }
}

@keyframes show-navbar-collapse {
  0% {
    transform: scale(0.95);
    transform-origin: 100% 0;
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes hide-navbar-collapse {
  from {
    transform: scale(1);
    transform-origin: 100% 0;
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}

p {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
}
</style>
