<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Objetos 3D</h3>
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
                                        <th>Costo/Puntos</th>
                                        <th>File Name</th>
                                        <th>Objeto</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="object in objectsToShow" :key="object.id">
                                        <td>{{ object.id }}</td>
                                        <td>{{ object.title }}</td>
                                        <td>{{ object.description }}</td>
                                        <td>{{ object.costInPoints }}</td>
                                        <td>{{ object.fileName }}</td>
                                        <td>

                                            <!-- <img :src="object.image" style="max-width: 100px; max-height: 100px;"> -->

                                            <div class="card" style="width: 18rem">
                                                <model-viewer :src="object.object" alt="Modelo 3D" disable-zoom disable-pan
                                                    disable-touch-zoom disable-rotate auto-rotate="0"></model-viewer>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="searchButtons input-group-text"
                                                @click="viewobject(object.fileName)">
                                                <i class="bi bi-eye-fill" style="
                          font-size: 1.2rem;
                          color: #000;
                          font-weight: bold;">
                                                </i>
                                            </span>

                                            <span class="searchButtons input-group-text"
                                                @click="editobject(object.fileName)">
                                                <i class="bi bi-pencil-square" style="
                          font-size: 1.2rem;
                          color: #000;
                          font-weight: bold;">
                                                </i>
                                            </span>

                                            <span class="searchButtons input-group-text"
                                                @click="deleteObject(object.fileName)">
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
import { get3DObjectsController, deleteRewardsByRewardIdController } from "@/controllers/rewardsController";
import '@google/model-viewer';

export default {
    components: {
        'model-viewer': window.ModelViewer,
    },
    data() {
        return {
            objects: [],
            objectsToShow: [],
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
        const objectsRes = await get3DObjectsController();

        objectsRes.forEach(object => {
            console.log("object en for each: ", object);


            if (object.metadata[0].metadata.title) {
                this.objects.push({
                    id: object.metadata[0].id,
                    title: object.metadata[0].metadata.title,
                    description: object.metadata[0].metadata.description,
                    costInPoints: object.metadata[0].metadata.costInPoints,
                    userID: object.metadata[0].metadata.userID,
                    object: object.url,
                    fileName: object.metadata[0].name.substring(10)
                });
            }
        });

        this.filterobjects(); // Aplica la búsqueda al montar el componente
        this.objectsToShow = this.objects.slice(0, this.pagination.rowsPerPage);
        this.totalPages = Math.ceil(this.objects.length / this.pagination.rowsPerPage);
        this.totalItems = this.objects.length;
    },
    methods: {
        filterobjects() {
            if (!this.searchTerm) {
                this.objectsToShow = this.objects.slice(0, this.pagination.rowsPerPage);
            } else {
                this.objectsToShow = this.objects.filter(object =>
                    object.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    object.description.toLowerCase().includes(this.searchTerm.toLowerCase())
                ).slice(0, this.pagination.rowsPerPage);
            }
            this.totalPages = Math.ceil(this.objectsToShow.length / this.pagination.rowsPerPage);
            this.totalItems = this.objectsToShow.length;
        },
        viewobject(fileName) {
            console.log("fileName in viewobject: ", fileName);
        },
        editobject(fileName) {
            console.log("fileName in editobject: ", fileName);
        },
        async deleteObject(fileName) {
            const result = await this.$swal({
                title: '¿Deseas eliminar el objeto?',
                text: 'Se eliminará el objeto y todos sus enlaces con los materiales publicitarios.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: "No",
            });
            if (!result.isConfirmed) {
                await this.$swal({
                    title: 'No se ha eliminado',
                    text: "Ni el object ni sus enlaces con los materiales han sido eliminados.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            }

            const rewardId = fileName;
            const typeOfReward = "3d";
            const data = { rewardId, typeOfReward };
            const res = await deleteRewardsByRewardIdController(data);

            if (res.status) {
                await this.$swal({
                    title: 'object eliminado',
                    text: "El object y sus enlaces con los materiales han sido eliminados.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            } else {
                console.error("Ha ocurrido un error al eliminar el object seleccionado: ", res);
                await this.$swal({
                    title: 'No se ha eliminado',
                    text: "Ha ocurrido un error al eliminar el object seleccionado.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            }

            this.objectsToShow = this.objectsToShow.filter(object => object.fileName !== fileName);
        }
    },
    watch: {
        searchTerm: {
            handler() {
                this.filterobjects();
            },
            immediate: true, // Ejecuta el handler inmediatamente al montar el componente
        },
        pagination: {
            handler() {
                this.objectsToShow = this.objects.slice((this.pagination.page - 1) * this.pagination.rowsPerPage, this.pagination.page * this.pagination.rowsPerPage);
                this.totalPages = Math.ceil(this.objects.length / this.pagination.rowsPerPage);
                this.totalItems = this.objects.length;
                this.filterobjects(); // Aplica la búsqueda después de cambiar la paginación
            },
            deep: true
        }
    }
};
</script>

<style></style>