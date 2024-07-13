<template>
    <div class="titleContainer">
        <h1>
            Premio Seleccionado
        </h1>
    </div>
    <div class="reward-container">
        <div class="reward-content">
            <h1 class="reward-title">{{ reward.metadata[0].metadata.title }}</h1>
            <p class="reward-description">{{ reward.metadata[0].metadata.description }}</p>
            <div class="reward-image-container">
                <img v-if="reward.type != '3d'" :src="reward.url" id="rewardStPr" alt="Reward Image" class="reward-image" />
                <model-viewer id="reward3d" v-else :src="reward.url" alt="Modelo 3D" disable-zoom disable-pan
                    disable-touch-zoom disable-rotate auto-rotate="0"></model-viewer>
            </div>
            <p class="reward-type">Type: {{ reward.type }}</p>
            <p class="reward-type">Costo en puntos: {{ reward.metadata[0].metadata.costInPoints }}</p>

            <!-- Para productos -->
            <div v-if="reward.type == 'pr'">
                <!-- Input for Names -->
                <div class="form-group">
                    <label for="names">Nombre Completo:</label>
                    <input class="form-control" type="text" id="names" v-model="names" required>
                </div>

                <!-- Input for Email -->
                <div class="form-group">
                    <label for="email">Correo Electrónico:</label>
                    <input class="form-control" type="email" id="email" v-model="email" required>
                </div>

                <!-- Input for Cellphone -->
                <div class="form-group">
                    <label for="cellphone">Número de Teléfono:</label>
                    <input class="form-control" type="tel" id="cellphone" v-model="cellphone" required>
                </div>

                <!-- Input for City -->
                <div class="form-group">
                    <label for="city">Ciudad:</label>
                    <input class="form-control" type="text" id="city" v-model="city" required>
                </div>

                <!-- Input for Street -->
                <div class="form-group">
                    <label for="street">Calle y Número:</label>
                    <input class="form-control" type="text" id="street" v-model="street" required>
                </div>

                <!-- Input for Description -->
                <div class="form-group">
                    <label for="description">Descripción del Producto:</label>
                    <textarea class="form-control" id="description" v-model="description" required></textarea>
                </div>
            </div>

            <button @click="reedemReward()" class="redeembutton">Redimir</button>
        </div>

    </div>
</template>

<script>
import { computed } from "vue";
import { reedemRewardController } from "../../controllers/rewardsController";
import multiselect from 'vue-multiselect';
import { useUserStore } from "../../stores/userStore";
import '@google/model-viewer';
import { getUserInformation } from "@/models/firebase/config";

export default {
    data() {
        return {
            reward: {},

            names: "",
            email: "",
            cellphone: "",
            city: "",
            street: "",
            description: ""
        };
    },
    components: {
        multiselect,
        'model-viewer': window.ModelViewer,
    },
    setup() {
        const store = useUserStore();
        const user = computed(() => {
            return store.getUser;
        });
        console.log("User at reedemReward: ", user);
        return { user };
    },
    async created() {
        this.reward = JSON.parse(this.$route.query.reward);
        console.log("this.reward: ", this.reward);

    },
    methods: {
        async reedemReward() {
            let costInPoints = this.reward.metadata[0].metadata.costInPoints;
            console.log("this.reward: ", costInPoints);
            this.$swal({
                title: "¿Estás seguro?",
                text: "¡Vas a redimir este premio por " + costInPoints + " puntos!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, canjear!",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const parts = this.reward.metadata[0].name.split("/");

                    // Toma el último elemento del array resultante
                    let fileName = parts[parts.length - 1];
                    console.log("fileNamee: ", fileName);
                    let rewardToSend = {
                        fileName, type: this.reward.type, uid: this.user.id, associatedKit: this.reward.kitId
                    }

                    if (this.reward.type == "pr") {
                        rewardToSend = {
                            ...rewardToSend,
                            names: this.names, email: this.email, cellphone: this.cellphone, city: this.city, street: this.street, description: this.description
                        }
                    }
                    console.log("reward to redeem in redeem: ", rewardToSend);
                    const res = await reedemRewardController(rewardToSend);
                    console.log("res in reedem reward: ", res);

                    if (!res.success) {
                        console.error("Ha ocurrido un error al redimir el premio seleccionado: ", res);
                        await this.$swal({
                            title: 'No se ha redimido el premio',
                            text: "Ha ocurrido un error al redimir el premio seleccionado. " + res.message,
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                        return;
                    }

                    if (this.reward.type == "pr") {
                        await this.$swal({
                            title: 'Premio físico redimido',
                            text: "Estás redimiendo un producto físico de la tienda, la solicitud se enviará a los administradores y será procesada tan pronto como sea posible. Puedes observar el estado de la entrega desde tu perfil en la sección de premios.",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                    } else {
                        await this.$swal({
                            title: 'El premio ha sido redimido',
                            text: "El premio se redimió exitosamente, ahora está disponible en tu perfil.",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                    }

                    getUserInformation();
                    this.$router.push({ name: 'userRewards' });
                }else{
                    await this.$swal({
                            title: 'El premio no ha sido redimido',
                            text: "No se te descontará ningún punto.",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                }
            });



        }
    }
};
</script>

<style scoped>
#reward3d {
    width: 100%;
    height: 100%;
}

#rewardStPr{
    width: 100%;
    
}

.reward-container {
    max-width: 600px;
    margin: 1% auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.reward-content {
    margin-bottom: 20px;
}

.reward-title {
    font-size: 24px;
    margin-bottom: 10px;
}

.reward-description {
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
}

.reward-image-container {
    text-align: center;
    background-color: #fff8ed;
    min-height: 300px;
}

.reward-image {
    max-width: 100%;
    height: auto;
}

.reward-type {
    font-size: 16px;
    color: #777;
}

.redeembutton {
    /* display: block; */
    width: 100%;
    padding: 10px 20px;
    font-size: 18px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 30px 0px 0px 0px;
}

.redeem-button:hover {
    background-color: #0056b3;
}
</style>
