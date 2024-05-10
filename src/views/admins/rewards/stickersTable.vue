<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Stickers</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <div>
                <input type="text" v-model="searchTerm" placeholder="Buscar por título o descripción"
                  class="form-control">
              </div>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>UserID</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sticker in stickersToShow" :key="sticker.id">
                    <td>{{ sticker.id }}</td>
                    <td>{{ sticker.title }}</td>
                    <td>{{ sticker.description }}</td>
                    <td>{{ sticker.userID }}</td>
                    <td><img :src="sticker.image" style="max-width: 100px; max-height: 100px;"></td>
                    <td>
                      <span class="searchButtons input-group-text" @click="viewSticker(sticker.id)" >
                        <i class="bi bi-pencil-square" style="
                        font-size: 1.2rem;
                        color: #000;
                        font-weight: bold;">
                        </i>
                      </span>

                      <span class="searchButtons input-group-text" @click="deleteSticker(sticker.id)" >
                        <i class="bi bi-trash3-fill" style="
                        font-size: 1.2rem;
                        color: #000;
                        font-weight: bold;">
                        </i>
                      </span>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <select v-model="pagination.rowsPerPage" class="form-select">
                  <option v-for="option in rowsPerPageOptions" :value="option">{{ option }}</option>
                </select>
              </div>
              <div>
                <span>Página {{ pagination.page }} de {{ totalPages }}</span>
                <span> (Total de items: {{ totalItems }})</span>
              </div>
              <div>
                <button @click="pagination.page--" :disabled="pagination.page === 1"
                  class="btn btn-secondary">Anterior</button>
                <button @click="pagination.page++" :disabled="pagination.page === totalPages"
                  class="btn btn-secondary">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStickersController } from "@/controllers/rewardsController";

export default {
  components: {
  },
  data() {
    return {
      stickers: [],
      stickersToShow: [],
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      rowsPerPageOptions: [10, 20, 50],
      totalPages: 1,
      totalItems: 0,
      searchTerm: '', // Nuevo campo para almacenar el término de búsqueda
    };
  },
  async mounted() {
    const stickersRes = await getStickersController();
    stickersRes.forEach(sticker => {
      if (sticker.metadata[0].metadata.title) {
        this.stickers.push({
          id: sticker.metadata[0].id,
          title: sticker.metadata[0].metadata.title,
          description: sticker.metadata[0].metadata.description,
          userID: sticker.metadata[0].metadata.userID,
          image: sticker.url
        });
      }
    });

    this.filterStickers(); // Aplica la búsqueda al montar el componente
    this.stickersToShow = this.stickers.slice(0, this.pagination.rowsPerPage);
    this.totalPages = Math.ceil(this.stickers.length / this.pagination.rowsPerPage);
    this.totalItems = this.stickers.length;
  },
  methods: {
    filterStickers() {
      if (!this.searchTerm) {
        this.stickersToShow = this.stickers.slice(0, this.pagination.rowsPerPage);
      } else {
        this.stickersToShow = this.stickers.filter(sticker =>
          sticker.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          sticker.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).slice(0, this.pagination.rowsPerPage);
      }
      this.totalPages = Math.ceil(this.stickersToShow.length / this.pagination.rowsPerPage);
      this.totalItems = this.stickersToShow.length;
    },
  },
  watch: {
    searchTerm: {
      handler() {
        this.filterStickers();
      },
      immediate: true, // Ejecuta el handler inmediatamente al montar el componente
    },
    pagination: {
      handler() {
        this.stickersToShow = this.stickers.slice((this.pagination.page - 1) * this.pagination.rowsPerPage, this.pagination.page * this.pagination.rowsPerPage);
        this.totalPages = Math.ceil(this.stickers.length / this.pagination.rowsPerPage);
        this.totalItems = this.stickers.length;
        this.filterStickers(); // Aplica la búsqueda después de cambiar la paginación
      },
      deep: true
    }
  }
};
</script>

<style></style>
