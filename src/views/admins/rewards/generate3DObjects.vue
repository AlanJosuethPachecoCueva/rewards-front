<template>
    <div class="bigContainerKit">
        <div id="containerFor3DInputs">
            <h2 class="title">Agregar Un Objeto 3D</h2>
            <div class="form-group group">
                <label class="label" for="name">Título</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': titleTouched && !titleValid }"
                    placeholder="Ingrese el título del object" id="title" v-model="title" @blur="titleTouched = true">
            </div>
            <div class="form-group group">
                <label class="label" for="description">Descripción</label>
                <textarea class="form-control" :class="{ 'is-invalid': descriptionTouched && !descriptionValid }"
                    rows="3" placeholder="Ingrese una descripción para su object" id="description" v-model="description"
                    @blur="descriptionTouched = true"></textarea>
            </div>

            <div class="createKitContainer" id="bigContainerobject">
                <div id="showInformationLeft">
                    <!-- Mostrar aquí el modelo 3d -->
                    <model-viewer class="modelViewer" v-if="objectSrc" :src="objectSrc" alt="Descripción del modelo"
                        poster="../../../assets/images/Waiting3DModel3.png" auto-rotate camera-controls
                        ar></model-viewer>
                        <div class="modelViewer" id="modelViewerText" v-if="!objectSrc">
                            <h3  >Esperando objeto 3D...</h3>
                        </div>
                    
                </div>
            </div>

            <div class="createKitContainerRight">
                <div class="card cardContainer">
                    <div class="form-group generateKitIA">
                        <div class="mb-3">
                            <label for="objectInput" class="label">Seleccionar del almacenamiento:</label>
                            <input type="file" class="form-control" id="objectInput" @change="selectObjectFromDevice"
                                ref="objectInput" accept=".gltf,.glb">
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary btnGenerateKit" @click="checkForm()">Guardar</button>
        </div>

    </div>

</template>

<script>
import { computed } from "vue";
import { useUserStore } from "../../../stores/userStore.js";
import { saveStickerByFileController } from "../../../controllers/rewardsController";
import '@google/model-viewer'; // Importa model-viewer

export default {
    data() {
        return {
            objectSrc: null,
            file: null,
            title: "",
            description: "",
            titleTouched: false,
            descriptionTouched: false,
            errors: [],
        };
    },
    components: {
        'model-viewer': window.ModelViewer
    },
    setup() {
        const store = useUserStore();
        const valueRes = computed(() => {
            return store.getUser;
        });

        const user = valueRes.value;
        return { user };
    },
    methods: {
        async selectObjectFromDevice(event) {
            try {
                this.file = event.target.files[0];
                if (this.file) {
                    this.objectSrc = URL.createObjectURL(this.file);
                }
                await this.$swal({
                    title: "¡El objeto 3D ha sido cargado!",
                    text: "Si no puedes visualizar el objeto 3D, revisa que el mismo esté en formato .glb, que no esté corrupto e intenta nuevamente",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            } catch (error) {
                await this.$swal({
                    title: "¡Ocurrió un error!",
                    text: "Por favor, revisa que el objeto 3D esté en formato .glb, que no esté corrupto e intenta nuevamente :(",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            }

        },
        async saveObjectInFirebase() {
            this.$swal.fire({
                title: 'Cargando...',
                text: 'Por favor, espera mientras se guarda el objecto 3D.',
                allowOutsideClick: false,
                showConfirmButton: false,
                confirmButtonText: false,
            });

            const userID = this.user.id;
            const object = this.file;
            const title = this.title;
            const description = this.description;

            await saveStickerByFileController({ object, title, description, userID });

            this.$swal.close();

            await this.$swal.fire({
                title: '¡Éxito!',
                text: 'Objecto 3D subido correctamente.',
                allowOutsideClick: false,
                showConfirmButton: true,
            });
            this.$router.push("/admin/rewards");
        },
        async checkForm() {
            try {
                this.errors = [];
                if (!this.title || this.title.length < 4) {
                    this.errors.push("Se requiere un título válido (mínimo 4 caracteres).");
                }
                if (!this.description || this.description.length <= 10) {
                    this.errors.push("Se requiere una descripción válida (mínimo 10 caracteres).");
                }

                if (this.errors.length === 0) {
                    await this.saveObjectInFirebase();
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
};
</script>


<style>
.bigContainerKit {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#containerFor3DInputs {
    width: 90vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.createKitContainer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

#showInformationLeft {
    background: linear-gradient(to bottom, #f7dede, rgba(214, 198, 27, 0.1));
    padding: 10px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.createKitContainerRight {
    display: flex;
    justify-content: center;
    width: 50%;
}

.modelViewer {
    width: 45vw !important;
    height: 80vh !important;
}

#modelViewerText{
    display: flex;
    justify-content: center;
    align-items: center;
}

.title{
    padding: 30px 0 30px 0;
}
</style>