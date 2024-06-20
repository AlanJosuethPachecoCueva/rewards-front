<script>
import statsComponent from "@/components/admin/statsComponent.vue";
import rewardContainerComponent from "@/components/rewardContainerComponent.vue";
import cardsCarrouselComponent from "@/components/cardsCarrouselComponent.vue";
import {
  getKitsController,
  deleteKitByIdController,
} from "@/controllers/kitsController";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  components: {
    rewardContainerComponent,
    statsComponent,
    cardsCarrouselComponent,
    VueSweetalert2,
  },
  data() {
    return {
      logIn: true,
      kits: [],
      kitsToShow: [],
    };
  },
  methods: {
    goToCreateKit() {
      this.$router.push("/admin/createKit");
    },
    goToListView() {
      this.$router.push("/admin/listKits");
    },
    async getKits() {
      this.kits = await getKitsController();
      this.kitsToShow = JSON.parse(JSON.stringify(this.kits));
    },
    async deleteKit(kitId) {
      this.$swal({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Lógica para eliminar el kit
          const res = await deleteKitByIdController(kitId);
          if (!res) {
            throw new Error(`Kit ${kitId} was not deleted`);
          }
          console.log(`Deleting kit with ID: ${kitId}`);
          // Aquí llamarías a tu controlador de eliminación y actualizarías la lista de kits
          await this.getKits();
          this.$swal("¡Eliminado!", "El kit ha sido eliminado.", "success");
        }
      });
    },
    editKit(kit) {
      console.log(`Editing kit: ${kit.metadata[0].metadata.title}`);
    },
    search() {
      const searchTerm = this.$refs.searchInput.value;
      this.kitsToShow = [];
      this.kits.filter((kit) => {
        if (
          kit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          kit.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          this.kitsToShow.push(kit);
        } else {
          console.log("No encontrado");
        }
      });
    },
  },
  async mounted() {
    this.getKits();
  },
};
</script>
<template>
  <div>
    <statsComponent></statsComponent>
    <div class="containerKits" style="padding: 2rem">
      <h2 style="margin-bottom: 1.5rem">Kits</h2>
      <div class="input-group mb-3">
        <span
          class="input-group-text"
          @click="goToListView"
          style="
            cursor: pointer;
            font-size: 1.2rem;
            color: #000;
            font-weight: bold;
          "
        >
          <i class="bi bi-table"></i>
        </span>
        <span
          class="input-group-text"
          @click="goToCreateKit"
          style="
            cursor: pointer;
            font-size: 1.2rem;
            color: #000;
            font-weight: bold;
          "
        >
          <i class="bi bi-file-earmark-plus"></i>
        </span>
        <input
          type="text"
          class="form-control"
          ref="searchInput"
          placeholder="Ingresa tu búsqueda"
        />
        <span
          class="input-group-text"
          @click="search()"
          style="
            cursor: pointer;
            font-size: 1.2rem;
            color: #000;
            font-weight: bold;
          "
        >
          <i class="bi bi-search"></i>
        </span>
      </div>
      <div class="kits-grid">
        <div v-for="kit in kitsToShow" :key="kit.id" class="card">
          <img
            :src="kit.mainImageUrl"
            class="card-img-top"
            alt="Image"
            style="max-height: 200px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ kit.title }}</h5>
            <p class="card-text">{{ kit.description }}</p>
          </div>
          <div class="card-buttons">
            <button
              @click="editKit(kit)"
              style="
                font-size: 1rem;
                background-color: rgb(65, 39, 39);
                color: rgb(247, 246, 246);
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              "
            >
              <i
                class="bi bi-pencil-square"
                style="
                  font-size: 1.5rem;
                  color: rgb(247, 246, 246);
                  margin-right: 5px;
                "
              ></i>
              Editar
            </button>
            <button
              @click="deleteKit(kit.id)"
              style="
                font-size: 1rem;
                background-color: rgb(204, 0, 0);
                color: rgb(247, 246, 246);
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              "
            >
              <i
                class="bi bi-trash"
                style="
                  font-size: 1.5rem;
                  color: rgb(247, 246, 246);
                  margin-right: 5px;
                "
              ></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.containerKits {
  padding: 2rem;
}

.marginHeaders {
  margin-bottom: 1.5rem;
}

.searchButtons {
  cursor: pointer;
}

.bi {
  font-size: 1.2rem;
  color: #000;
  font-weight: bold;
}

.kits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
}

.card {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
}

.globe {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}
</style>
