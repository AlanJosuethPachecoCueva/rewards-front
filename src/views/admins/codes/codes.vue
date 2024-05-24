<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Códigos</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div>
                                <span class="searchButtons input-group-text" @click="goCreateCode()">
                                    <i class="bi bi-file-earmark-plus" style="
                                    font-size: 1.2rem;
                                    color: #000;
                                    font-weight: bold;">
                                    </i>
                                </span>
                                <input type="text" v-model="searchTerm" placeholder="Buscar por título o descripción"
                                    class="form-control">
                            </div>
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                        <th>File Name</th>
                                        <th>Imagen</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="sticker in productsToShow" :key="sticker.id">
                                        <td>{{ sticker.id }}</td>
                                        <td>{{ sticker.title }}</td>
                                        <td>{{ sticker.description }}</td>
                                        <td>{{ sticker.fileName }}</td>
                                        <td><img :src="sticker.image" style="max-width: 100px; max-height: 100px;"></td>
                                        <td>
                                            <span class="searchButtons input-group-text"
                                                @click="viewSticker(sticker.fileName)">
                                                <i class="bi bi-eye-fill" style="
                          font-size: 1.2rem;
                          color: #000;
                          font-weight: bold;">
                                                </i>
                                            </span>

                                            <span class="searchButtons input-group-text"
                                                @click="editSticker(sticker.fileName)">
                                                <i class="bi bi-pencil-square" style="
                          font-size: 1.2rem;
                          color: #000;
                          font-weight: bold;">
                                                </i>
                                            </span>

                                            <span class="searchButtons input-group-text"
                                                @click="deleteSticker(sticker.fileName)">
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
import { getProductsImagesController } from "@/controllers/rewardsController";
import { deleteRewardsByRewardIdController } from "@/controllers/rewardsController";

export default {
    components: {
    },
    data() {
        return {
            products: [],
            productsToShow: [],
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
        const productsRes = await getProductsImagesController();

        console.log("productsRes: ", productsRes);

        productsRes.forEach(sticker => {
            if (sticker.metadata[0].metadata.title) {
                this.products.push({
                    id: sticker.metadata[0].id,
                    title: sticker.metadata[0].metadata.title,
                    description: sticker.metadata[0].metadata.description,
                    userID: sticker.metadata[0].metadata.userID,
                    image: sticker.url,
                    fileName: sticker.metadata[0].name.substring(9)
                });
            }
        });

        this.filterproducts(); // Aplica la búsqueda al montar el componente
        this.productsToShow = this.products.slice(0, this.pagination.rowsPerPage);
        this.totalPages = Math.ceil(this.products.length / this.pagination.rowsPerPage);
        this.totalItems = this.products.length;
    },
    methods: {
        filterproducts() {
            if (!this.searchTerm) {
                this.productsToShow = this.products.slice(0, this.pagination.rowsPerPage);
            } else {
                this.productsToShow = this.products.filter(sticker =>
                    sticker.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    sticker.description.toLowerCase().includes(this.searchTerm.toLowerCase())
                ).slice(0, this.pagination.rowsPerPage);
            }
            this.totalPages = Math.ceil(this.productsToShow.length / this.pagination.rowsPerPage);
            this.totalItems = this.productsToShow.length;
        },
        viewSticker(fileName) {
            console.log("fileName in viewSticker: ", fileName);
        },
        editSticker(fileName) {
            console.log("fileName in editSticker: ", fileName);
        },
        async deleteSticker(fileName) {
            const result = await this.$swal({
                title: '¿Deseas eliminar el sticker?',
                text: 'Se eliminará el sticker y todos sus enlaces con los materiales publicitarios.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: "No",
            });
            if (!result.isConfirmed) {
                await this.$swal({
                    title: 'No se ha eliminado',
                    text: "Ni el sticker ni sus enlaces con los materiales han sido eliminados.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            }

            const rewardId = fileName;
            const typeOfReward = "pr";
            const data = { rewardId, typeOfReward };
            const res = await deleteRewardsByRewardIdController(data);

            if (res.status) {
                await this.$swal({
                    title: 'Sticker eliminado',
                    text: "El sticker y sus enlaces con los materiales han sido eliminados.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            } else {
                console.error("Ha ocurrido un error al eliminar el sticker seleccionado: ", res);
                await this.$swal({
                    title: 'No se ha eliminado',
                    text: "Ha ocurrido un error al eliminar el sticker seleccionado.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            }

            this.productsToShow = this.productsToShow.filter(sticker => sticker.fileName !== fileName);
        },
        goCreateCode() {
            this.$router.push("/admin/codes/createCode");
        },
    },
    watch: {
        searchTerm: {
            handler() {
                this.filterproducts();
            },
            immediate: true, // Ejecuta el handler inmediatamente al montar el componente
        },
        pagination: {
            handler() {
                this.productsToShow = this.products.slice((this.pagination.page - 1) * this.pagination.rowsPerPage, this.pagination.page * this.pagination.rowsPerPage);
                this.totalPages = Math.ceil(this.products.length / this.pagination.rowsPerPage);
                this.totalItems = this.products.length;
                this.filterproducts(); // Aplica la búsqueda después de cambiar la paginación
            },
            deep: true
        }
    }
};
</script>

<style></style>