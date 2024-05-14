<template>
    <div id="bigContainerAssignReward">
        <!-- Contenedor izquierdo (contenedor de imagen) -->
        <div id="leftAssignReward">
            <div id="imageContainerAssignReward" class="grid-item" v-if="rewardParams.type != '3d'">
                <img :src="reward.url" id="assignRewardImage" class="card-img-top" :alt="rewardParams.fileName">
            </div>

            <!-- Mostrar aquí el modelo 3d -->
            <model-viewer class="modelViewerAssignReward" v-if="rewardParams.type == '3d'" :src="reward.url" alt="Modelo 3d"
                poster="../../../assets/images/Waiting3DModel3.png" auto-rotate camera-controls ar></model-viewer>
            <div class="modelViewerAssignReward" id="modelViewerText" v-if="!reward.url && rewardParams.type == '3d'">
                <h3>Esperando objeto 3D...</h3>
            </div>

            <button class="btn btn-outline-dark flex-shrink-0" type="button" @click="assignRewardToKit()">
                Asignar Premio
                <i class="bi bi-arrow-right-circle-fill"></i>
            </button>
        </div>
        <!-- Línea divisoria -->
        <div id="lineaIntermedia"></div>
        <!-- Contenedor derecho (contenedor de cuadrícula) -->
        <div id="rightAssignReward">
            <div class="grid-container">
                <!-- Iterar sobre los kits y mostrarlos como elementos de la cuadrícula -->
                <div v-for="(kit, index) in kits" :key="kit.id" class="grid-item"
                    :class="{ 'selected': isSelected(kit.id) }" @click="toggleKitSelection(kit)">
                    <img :src="kit.mainImageUrl" :alt="kit.title" class="kit-image">
                    <!-- Contenedor de información y botón -->
                    <div class="info-button-container">
                        <!-- Botón para mostrar información -->
                        <button class="btn" id="info-button" @click="changeInfoCard(kit.id)">
                            <i class="bi bi-question-circle-fill"></i>
                        </button>

                    </div>
                    <!-- Número de selección -->
                    <span class="selection-number" v-if="isSelected(kit.id)">{{ selectedKits.indexOf(kit) + 1
                        }}</span>
                    <!-- Mostrar información del kit si está seleccionado -->
                    <div class="info-card" v-if="showInfoCardId === kit.id">
                        <h6>{{ kit.title }}</h6>
                        <p>{{ kit.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFileController, assignRewardToKitsController, get3DObjectsController } from "@/controllers/rewardsController";
import { getKitsController, getImagesFromKitsController } from "@/controllers/kitsController";
import '@google/model-viewer';

export default {
    components: {
        'model-viewer': window.ModelViewer,
    },
    data() {
        return {
            reward: { url: "https://static.vecteezy.com/system/resources/previews/011/125/843/non_2x/loading-icons-load-indicator-sign-waiting-symbols-free-vector.jpg" },
            rewardParams: null,
            kits: [],
            selectedKits: [],
            showInfoCardId: null,
            objectSrc: null,
        };
    },
    created() {
        this.getData();
    },
    async mounted() {
        this.kits = await getKitsController();
        this.kits = await getImagesFromKitsController(this.kits);

        // //Objetos 3D
        // const threeDObjectsRes = await get3DObjectsController();
        // console.log("threeDObjectsRes: ", threeDObjectsRes);
        // // Agrega cada objeto de res a this.stickers
        // threeDObjectsRes.forEach(object => {
        //     // Verifica si el título existe y no es una cadena vacía
        //     if (object.metadata[0].metadata.title) {
        //         this.threeDObjects.push(object);
        //     }
        // });
        // console.log("this.threeDObjects: ", this.threeDObjects);
        // this.threeDObjectsToShow = JSON.parse(JSON.stringify(this.threeDObjects));
        // console.log("this.threeDObjectsToShow: ", this.threeDObjectsToShow);
    },
    methods: {
        // Obtener datos de recompensa
        async getData() {
            const id = this.$route.params.rewardId;
            const fileName = id.substring(3);
            const type = id.substring(0, 2);
            this.rewardParams = {
                fileName,
                type,
            }
            this.reward = await getFileController(this.rewardParams);
        },
        // Alternar selección de kit
        toggleKitSelection(kit) {
            const index = this.selectedKits.findIndex(selectedKit => selectedKit.id === kit.id);
            if (index === -1) {
                this.selectedKits.push(kit);
            } else {
                this.selectedKits.splice(index, 1);
            }
        },
        // Verificar si un kit está seleccionado
        isSelected(kitId) {
            return this.selectedKits.some(selectedKit => selectedKit.id === kitId);
        },
        // Cambiar la carta de información del kit
        changeInfoCard(id) {
            if (this.showInfoCardId === id) {
                this.showInfoCardId = null;
            } else {
                this.showInfoCardId = id;
            }
        },
        async assignRewardToKit() {

            if (this.selectedKits.length < 1) {
                await this.$swal({
                    title: 'Error',
                    text: "Debes seleccionar almenos un material publicitario para enlazar el premio.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            } else {
                const result = await this.$swal({
                    title: '¿Deseas continuar?',
                    text: 'Se enlazará el premio a todos los materiales publicitarios seleccionados.',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: "No",
                });
                if (result.isConfirmed) {
                    let selectedKitsIds = this.selectedKits.map(kit => kit.id);
                    const res = await assignRewardToKitsController({ type: this.rewardParams.type, rewardId: this.rewardParams.fileName, kitsIds: selectedKitsIds })
                    if (res.status) {
                        await this.$swal({
                            title: 'Éxito',
                            text: "Se ha enlazado el premio con los materiales publicitarios especificados.",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                        this.$router.push("/admin/rewards");
                    } else {
                        await this.$swal({
                            title: 'Error',
                            text: "Ha ocurrido un error y no se enlazó el premio con los materiales. Por favor, vuelve a intentar.",
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                    }
                }

            }

        },
    },
};
</script>

<style>
.modelViewerAssignReward{
    background: linear-gradient(to bottom, #f7dede, rgba(214, 198, 27, 0.1));
    width: 90%;
    height: 80%;
}
/* Estilo para elementos de cuadrícula */
#lineaIntermedia {
    background-color: rgb(214, 170, 27);
    width: 2px;
    height: 100%;
}

#bigContainerAssignReward {
    width: 100%;
    height: 94.3vh;
    /* height: 100%; */
    display: flex;
}

#leftAssignReward {
    background-color: rgba(214, 198, 27, 0.1);
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

#rightAssignReward {
    width: 75%;

}

#imageContainerAssignReward {
    /* background-color: green; */
    width: 80%;
    height: fit-content;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 10px;
    padding: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.grid-item {
    position: relative;
    border: 1px solid #ccc;
    padding: 5px;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.kit-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.kit-info {
    position: absolute;
    /* Posiciona absolutamente dentro de .grid-item */
    top: 0;
    /* Alinea el inicio de .kit-info con el inicio de .grid-item */
    left: 0;
    /* Alinea el inicio de .kit-info con el inicio de .grid-item */
    width: 100%;
    /* Asegura que .kit-info ocupe todo el ancho de .grid-item */
    height: 100%;
    /* Asegura que .kit-info ocupe todo el alto de .grid-item */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Centra el contenido verticalmente */
    align-items: center;
    /* Centra el contenido horizontalmente */
    background-color: rgba(255, 255, 255, 0.1);
    /* Fondo transparente con un poco de opacidad */
    border: 3px solid black;
    z-index: 2;
    /* Asegura que .kit-info esté por encima de .kit-image */
}


/* Estilo para elementos de cuadrícula seleccionados */
.selected {
    border-color: #007bff;
    /* Cambiar color del borde cuando se selecciona */
}

/* Estilo para botón de información */
.info-button-container {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    color: #ffffff;
}

#info-button {
    font-size: 2rem;
    color: #ffffff;
    font-weight: 400;
    background-color: transparent;
    border: none;
}

/* Estilo para número de selección */
.selection-number {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: #0195ffd0;
    border: 2px solid white;
    color: #ffffff;
    font-weight: bold;
    font-size: 0.9rem;
    padding: 4px;
    border-radius: 50%;
    width: 32px;
    text-align: center;
}

/* Estilo para carta de información */
.info-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -50%);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 5px;
    z-index: 3;
    font-size: 1px !important;
    width: 90%;
    height: 100%;
}

/* Media queries para ajustar el tamaño de las celdas de la cuadrícula en diferentes tamaños de pantalla */
@media (min-width: 576px) {
    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (min-width: 768px) {
    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}

@media (min-width: 992px) {
    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
}
</style>