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
                <img v-if="reward.type != '3d'" :src="reward.url" alt="Reward Image" class="reward-image" />
                <model-viewer v-else :src="reward.url" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom
                    disable-rotate auto-rotate="0"></model-viewer>
            </div>
            <p class="reward-type">Type: {{ reward.type }}</p>
            <p class="reward-type">Costo en puntos: {{ reward.metadata[0].metadata.costInPoints }}</p>
            <div class="mb-3">
                <label for="kit" class="form-label">Kit Asociado</label>
                <multiselect v-model="selectedKit" :options="kits" label="title" track-by="id" :multiple="false"
                    mode="tags" placeholder="Selecciona los kits"></multiselect>
            </div>
            <button @click="reedemReward()" class="redeembutton">Redimir</button>
        </div>

    </div>
</template>

<script>
import { getKitsController } from "../../controllers/kitsController";
import { computed } from "vue";
import { reedemRewardController } from "../../controllers/rewardsController";
import multiselect from 'vue-multiselect';
import { useUserStore } from "../../stores/userStore";
import '@google/model-viewer';

export default {
    data() {
        return {
            reward: {},
            kits: [],
            selectedKit: null
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

        this.kits = await getKitsController();
    },
    methods: {
        async reedemReward() {
            console.log("rerafegf");
            const parts = this.reward.metadata[0].name.split("/");

            // Toma el último elemento del array resultante
            let fileName = parts[parts.length - 1];
            console.log("fileNamee: ", fileName);
            const rewardToSend = {
                fileName, type: this.reward.type, uid: this.user.id, associatedKit: this.selectedKit.id
            }
            const res = await reedemRewardController(rewardToSend);
            console.log("res in reedem reward: ", res);

            if (!res.success) {
                console.error("Ha ocurrido un error al redimir el sticker seleccionado: ", res);
                await this.$swal({
                    title: 'No se ha redimido el premio',
                    text: "Ha ocurrido un error al redimir el premio seleccionado.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
                return;
            }

            await this.$swal({
                title: 'El premio ha sido redimido',
                text: "El premio se redimió exitosamente, ahora está disponible en tu perfil.",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "OK",
            });
            this.$router.push({ name: 'userRewards' });

        }
    }
};
</script>

<style scoped>
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
}

.redeem-button:hover {
    background-color: #0056b3;
}
</style>
