<template>
    <div class="containerShowRewards">
        <div class="card-grid">
            <div v-for="reward in rewards" :key="reward.url" class="cardShowRewards">
                <div v-if="reward.metadata[0].id.includes('3DObjects')" class="custom-card-size">
                    <model-viewer :src="reward.url" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom
                        disable-rotate auto-rotate="0"></model-viewer>
                </div>
                <div v-else>
                    <img :src="reward.url" class="card-img" alt="Reward Image" />
                </div>

                <div class="card-body">
                    <h5 class="card-title">{{ reward.metadata[0].metadata.title }}</h5>
                    <p class="card-text">{{ reward.metadata[0].metadata.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getStickersController, get3DObjectsController, getProductsImagesController } from "../../controllers/rewardsController";
import '@google/model-viewer';
export default {
    components: {
        // Registrar el componente importado
        'model-viewer': window.ModelViewer,
    },
    data() {
        return {
            logIn: true,
            rewards: []
        };
    },
    async created() {
        const stickers = await getStickersController();
        const objects = await get3DObjectsController();
        const products = await getProductsImagesController();

        console.log("stickers in showRewards", stickers);
        console.log("objects in showRewards", objects);
        console.log("products in showRewards", products);

        this.rewards = this.rewards.concat(stickers);
        this.rewards = this.rewards.concat(objects);
        this.rewards = this.rewards.concat(products);
        this.rewards.shift();
        console.log("rewards in showRewards", this.rewards);
    },
    methods: {
        switchButton() {
        },
    },
};
</script>

<style>
.containerShowRewards {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.card-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    /* Gap between cards */
    padding: 16px;
}

.cardShowRewards {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s;
    width: 100%;
    max-width: 300px;
    /* Maximum width of each card */
}

.card:hover {
    transform: translateY(-5px);
}

.card-img {
    width: 100%;
    height: auto;
}

.card-body {
    padding: 16px;
}

.card-title {
    font-size: 1.25rem;
    margin: 0;
}

.card-text {
    font-size: 1rem;
    color: #666;
}
</style>
