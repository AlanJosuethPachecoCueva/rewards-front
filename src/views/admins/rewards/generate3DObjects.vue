<template>
    <div class="bigContainerKit3D">
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
            <div class="form-group group">
                <label class="label" for="points">Cantidad de puntos</label>
                <input type="number" class="form-control" :class="{ 'is-invalid': pointsTouched && pointsValid }"
                    placeholder="Ingrese la cantidad de puntos" id="points" v-model="points"
                    @blur="pointsTouched = true">
            </div>
            <div class="errorsContainer">
                <p v-if="errors.length" class="text-danger">
                    <b>Por favor, corrija lo siguiente:</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
                </p>
            </div>

            <div class="createKitContainer" id="bigContainerobject">
                <div id="showInformationLeft">
                    <!-- Mostrar aquí el modelo 3d -->
                    <model-viewer class="modelViewer" v-if="objectSrc" :src="objectSrc" alt="Descripción del modelo"
                        poster="../../../assets/images/Waiting3DModel3.png" auto-rotate camera-controls
                        ar></model-viewer>
                    <div class="modelViewer" id="modelViewerText" v-if="!objectSrc">
                        <h3>Esperando objeto 3D...</h3>
                    </div>

                </div>
            </div>

            <div class="createKitContainerRight">
                <div class="card cardContainer">
                    <div class="form-group generateKitIA">
                        <div class="mb-3">
                            <label for="objectInput" class="label">Upload file from local storage:</label>
                            <input type="file" class="form-control" id="objectInput" @change="selectObjectFromDevice"
                                ref="objectInput" accept=".gltf,.glb">
                        </div>
                        <div class="mb-3">
                            <label for="bundleInput" class="label">Upload asset bundle file for Android:</label>
                            <input type="file" class="form-control" id="bundleInput" @change="selectBundleFile"
                                ref="bundleInput" accept="*">
                        </div>
                        <div class="mb-3">
                            <label for="iosbundleInput" class="label">Upload asset bundle file for Ios:</label>
                            <input type="file" class="form-control" id="iosbundleInput" @change="selectIosBundleFile"
                                ref="iosbundleInput" accept="*">
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
import { saveStickerByFileController, save3DObjectByFileController } from "../../../controllers/rewardsController";
import '@google/model-viewer';

export default {
    data() {
        return {
            objectSrc: null,
            file: null,
            androidBundleFile:null,
            iosBundleFile: null,
            title: "",
            description: "",
            titleTouched: false,
            descriptionTouched: false,
            errors: [],
            points: "",
            priceTouched: false,
            pointsTouched: false,
            pointsValid: true,
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
        async selectBundleFile(event) {
            try {
                this.androidBundleFile = event.target.files[0];
                if (this.androidBundleFile) {
                    console.log("Se cargo correctamente el objeto")
                }
                await this.$swal({
                    title: "¡El bundle ha sido cargado!",
                    text: "Si no cargaste el archivo del bundle asociado al objeto 3D reemplázalo",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            } catch (error) {
                await this.$swal({
                    title: "¡Ocurrió un error!",
                    text: "Por favor, revisa que el archivo del bundle, no esté corrupto e intenta nuevamente :(",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            }

        },
        async selectIosBundleFile(event) {
            try {
                this.iosBundleFile = event.target.files[0];
                if (this.iosBundleFile) {
                    console.log("Se cargo correctamente el objeto")
                }
                await this.$swal({
                    title: "¡El bundle ha sido cargado!",
                    text: "Si no cargaste el archivo del bundle asociado al objeto 3D reemplázalo",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            } catch (error) {
                await this.$swal({
                    title: "¡Ocurrió un error!",
                    text: "Por favor, revisa que el archivo del bundle, no esté corrupto e intenta nuevamente :(",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            }

        },
        pointsValid() {
            return this.pointsTouched ? this.points && this.points > 0 : true;
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
            const file = this.file;
            const androidBundleFile = this.androidBundleFile
            const iosBundleFile = this.iosBundleFile
            const title = this.title;
            const description = this.description;
            const costInPoints = this.points;

            const res = await save3DObjectByFileController({ file, title, androidBundleFile,iosBundleFile,description, userID, costInPoints });

            this.$swal.close();

            console.log("res push: ", res);
            const rewardId = "3d-" + res.fileName;
            console.log("rewardId mod: ", rewardId);

            await this.$swal.fire({
                title: '¡Éxito!',
                text: 'Objecto 3D subido correctamente.',
                allowOutsideClick: false,
                showConfirmButton: true,
            });
            //this.$router.push("/admin/rewards");
            this.$router.push({ name: "assignRewardTokit", params: { rewardId } });
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
                if (!this.pointsValid || this.points == null) {
                    this.errors.push("La precio en puntos debe ser mayor que cero.");
                }
                if (this.file == null) {
                    this.errors.push("Debe cargarse un archivo 3D .glb .");
                }

                if (this.androidBundleFile == null) {
                    this.errors.push("Debe cargarse el asset bundle generado en unity para android.");
                }

                if (this.iosBundleFile == null) {
                    this.errors.push("Debe cargarse el asset bundle generado en unity para ios.");
                }

                if (this.errors.length === 0) {
                    await this.saveObjectInFirebase();
                } else {
                    await this.$swal({
                        title: "¡Ocurrió un error!",
                        text: "Por favor, solucione todas las sugerencias antes de continuar.",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
};
</script>


<style>
.bigContainerKit3D {
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

#modelViewerText {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    padding: 30px 0 30px 0;
}
</style>
