<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">{{ $t("codeMainTitle")}}</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div class="d-flex">
                                <span class="searchButtons input-group-text" @click="goCreateCode()">
                                    <i class="bi bi-file-earmark-plus" style="
                                    font-size: 1.2rem;
                                    color: #000;
                                    font-weight: bold;">
                                    </i>
                                </span>
                                <input type="text" v-model="searchTerm" 
                                :placeholder="$t('codesSearch')"
                                    class="form-control">
                            </div>
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>{{ $t("codesName") }}</th>
                                        <th>{{ $t("codesPoints") }}</th>
                                        <th>{{ $t("codesProducto") }}</th>
                                        <th>{{ $t("codesRedeemQuestion") }}</th>
                                        <th>{{ $t("codesSelectedKit") }}</th>
                                        <th>{{ $t("codesStartDate") }}</th>
                                        <th>{{ $t("codesEndDate") }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="code in codesToShow" :key="code.id">
                                        <td>{{ code.id }}</td>
                                        <td>{{ code.name }}</td>
                                        <td>{{ code.points }}</td>
                                        <td>{{ code.product }}</td>
                                        <td>{{ code.redeemed }}</td>
                                        <td>{{ code.selectedKits }}</td>
                                        <td>{{ code.startDate }}</td>
                                        <td>{{ code.endDate }}</td>
                                        <td>
                                            <span class="searchButtons input-group-text"
                                                @click="viewCode(code.fileName)">
                                                <i class="bi bi-eye-fill" style="
                          font-size: 1.2rem;
                          color: #000;
                          font-weight: bold;">
                                                </i>
                                            </span>

                                            <span class="searchButtons input-group-text"
                                                @click="editCode(code.fileName)">
                                                <i class="bi bi-pencil-square" style="
                          font-size: 1.2rem;
                          color: #000;
                          font-weight: bold;">
                                                </i>
                                            </span>

                                            <span class="searchButtons input-group-text"
                                                @click="deleteCode(code.id)">
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
        class="btn btn-secondary" style="margin-right: 10px;">{{ $t("codeReturnButton") }}</button>
    <button @click="pagination.page++" :disabled="pagination.page === totalPages"
        class="btn btn-secondary">{{ $t("codeNextButton") }}</button>
</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCodesController, deleteCodeByIdController } from "@/controllers/codesController.js";

export default {
    components: {
    },
    data() {
        return {
            codes: [],
            codesToShow: [],
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
        const codesRes = await getCodesController();

        console.log("codesRes: ", codesRes);

        this.codes = codesRes; 
        // codesRes.forEach(code => {
        //     if (code.metadata[0].metadata.title) {
        //         this.codes.push({
        //             id: code.metadata[0].id,
        //             title: code.metadata[0].metadata.title,
        //             description: code.metadata[0].metadata.description,
        //             userID: code.metadata[0].metadata.userID,
        //             image: code.url,
        //             fileName: code.metadata[0].name.substring(9)
        //         });
        //     }
        // });

        this.filterCodes(); // Aplica la búsqueda al montar el componente
        this.codesToShow = this.codes.slice(0, this.pagination.rowsPerPage);
        this.totalPages = Math.ceil(this.codes.length / this.pagination.rowsPerPage);
        this.totalItems = this.codes.length;
    },
     
    methods: {
        filterCodes() {
            if (!this.searchTerm) {
                this.codesToShow = this.codes.slice(0, this.pagination.rowsPerPage);
            } else {
                this.codesToShow = this.codes.filter(code =>
                    code.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    code.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                ).slice(0, this.pagination.rowsPerPage);
            }
            this.totalPages = Math.ceil(this.codesToShow.length / this.pagination.rowsPerPage);
            this.totalItems = this.codesToShow.length;
        },
        viewCode(fileName) {
            console.log("fileName in viewCode: ", fileName);
        },
        editCode(fileName) {
            console.log("fileName in editCode: ", fileName);
        },
        async deleteCode(codeId) {
            console.log("deleteCode id: ", codeId);
            const result = await this.$swal({
                title: '¿Deseas eliminar el código?',
                text: 'Se eliminará el código permanente y ya no será accesible.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: "No",
            });
            if (!result.isConfirmed) {
                await this.$swal({
                    title: 'No se ha eliminado',
                    text: "La información del código sigue estando disponible.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            }

            const res = await deleteCodeByIdController(codeId);

            if (res.status) {
                await this.$swal({
                    title: 'Código eliminado',
                    text: "El código se ha eliminado satisfactoriamente.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            } else {
                console.error("Ha ocurrido un error al eliminar el code seleccionado: ", res);
                await this.$swal({
                    title: 'No se ha eliminado',
                    text: "Ha ocurrido un error al eliminar el código seleccionado.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            }

            this.codesToShow = this.codesToShow.filter(code => code.id !== codeId);
        },
        goCreateCode() {
            this.$router.push("/admin/codes/createCode");
        },
    },
    watch: {
        searchTerm: {
            handler() {
                this.filterCodes();
            },
            immediate: true, // Ejecuta el handler inmediatamente al montar el componente
        },
        pagination: {
            handler() {
                this.codesToShow = this.codes.slice((this.pagination.page - 1) * this.pagination.rowsPerPage, this.pagination.page * this.pagination.rowsPerPage);
                this.totalPages = Math.ceil(this.codes.length / this.pagination.rowsPerPage);
                this.totalItems = this.codes.length;
                this.filterCodes(); // Aplica la búsqueda después de cambiar la paginación
            },
            deep: true
        }
    }
};
</script>

<style></style>