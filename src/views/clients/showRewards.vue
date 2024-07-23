<template>
  <div id="containerActiveRewards">
    <div class="titleContainer">
      <h1 class="rewards-title">{{ $t("showRewardsTitle") }}</h1>
    </div>
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <div>{{ $t("loading") }}</div>
    </div>

    <div class="containerShowRewards">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="$t('showRewardsSearchplaceholder')"
          class="search-bar"
        />
      </div>

      <div
        v-for="(kitData, kitId) in filteredKitsRewards"
        :key="kitId"
        class="kit-section"
        id="containerOfKitRewards"
      >
        <!-- {{ kitData }} -->
        <div id="containerOfKitRewardsTitle">
          <h2>{{ kitData.kit.title }}</h2>
        </div>

        <div id="containerOfKitRewardsDescription">
          <p>{{ kitData.kit.description }}</p>
        </div>

        <div v-if="kitData.rewards.stickers.length > 0">
          <h3 class="activeRewardsTitle">Stickers</h3>
          <div class="card-grid">
            <div
              v-for="sticker in kitData.rewards.stickers"
              :key="sticker"
              class="cardShowRewards"
            >
              <div class="card-image-container">
                <img
                  :src="getRewardUrl(sticker)"
                  class="card-img"
                  alt="Reward Image"
                />
                <button
                  class="redeem-button"
                  @click="reedem(sticker, 'st', kitId)"
                >
                  {{ $t("showRewardRedeemButton") }}
                </button>
                <button class="award-cost" @click="">
                  {{ getRewardCost(sticker) }}
                  <i>
                    <img
                      src="../../assets//images//cacao.png"
                      alt="Points Icon"
                      style="width: 20px; height: 20px"
                    />
                  </i>
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ getRewardTitle(sticker) }}</h5>
                <p class="card-text">{{ getRewardDescription(sticker) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="kitData.rewards.threeDObjects.length > 0">
          <h3 class="activeRewardsTitle">3D Objects</h3>
          <div class="card-grid">
            <div
              v-for="threeDObject in kitData.rewards.threeDObjects"
              :key="threeDObject"
              class="cardShowRewards"
            >
              <div class="card-image-container custom-card-size">
                <model-viewer
                  :src="getRewardUrl(threeDObject)"
                  alt="Modelo 3D"
                  disable-zoom
                  disable-pan
                  disable-touch-zoom
                  disable-rotate
                  auto-rotate="0"
                ></model-viewer>
                <button
                  class="redeem-button"
                  @click="reedem(threeDObject, '3d', kitId)"
                >
                  {{ $t("showRewardRedeemButton") }}
                </button>
                <button class="award-cost" @click="">
                  {{ getRewardCost(threeDObject) }}
                  <i>
                    <img
                      src="../../assets//images//cacao.png"
                      alt="Points Icon"
                      style="width: 20px; height: 20px"
                    />
                  </i>
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ getRewardTitle(threeDObject) }}</h5>
                <p class="card-text">
                  {{ getRewardDescription(threeDObject) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="kitData.rewards.products.length > 0">
          <h3 class="activeRewardsTitle">Products</h3>
          <div class="card-grid">
            <div
              v-for="product in kitData.rewards.products"
              :key="product"
              class="cardShowRewards"
            >
              <div class="card-image-container">
                <img
                  :src="getRewardUrl(product)"
                  class="card-img"
                  alt="Reward Image"
                />
                <button
                  class="redeem-button"
                  @click="reedem(product, 'pr', kitId)"
                >
                  {{ $t("showRewardRedeemButton") }}
                </button>
                <button class="award-cost" @click="">
                  {{ getRewardCost(product) }}
                  <i>
                    <img
                      src="../../assets//images//cacao.png"
                      alt="Points Icon"
                      style="width: 20px; height: 20px"
                    />
                  </i>
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ getRewardTitle(product) }}</h5>
                <p class="card-text">{{ getRewardDescription(product) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStickersController,
  get3DObjectsController,
  getProductsImagesController,
  getKitsRewardsController,
} from "../../controllers/rewardsController";
import "@google/model-viewer";

export default {
  components: {
    "model-viewer": window.ModelViewer,
  },
  data() {
    return {
      logIn: true,
      kitsRewards: {},
      searchQuery: "",
      isLoading: true, // Estado de carga
    };
  },
  computed: {
    filteredKitsRewards() {
      const query = this.searchQuery.toLowerCase();
      const filteredKits = {};

      for (const [kitId, kitData] of Object.entries(this.kitsRewards)) {
        const kit = kitData.kit;
        const rewards = kitData.rewards;

        if (
          kit.title.toLowerCase().includes(query) ||
          kit.description.toLowerCase().includes(query)
        ) {
          filteredKits[kitId] = kitData;
          continue;
        }

        const filteredRewards = {
          stickers: rewards.stickers.filter((sticker) =>
            this.getRewardTitle(sticker).toLowerCase().includes(query)
          ),
          threeDObjects: rewards.threeDObjects.filter((threeDObject) =>
            this.getRewardTitle(threeDObject).toLowerCase().includes(query)
          ),
          products: rewards.products.filter((product) =>
            this.getRewardTitle(product).toLowerCase().includes(query)
          ),
        };

        if (
          filteredRewards.stickers.length ||
          filteredRewards.threeDObjects.length ||
          filteredRewards.products.length
        ) {
          filteredKits[kitId] = { kit, rewards: filteredRewards };
        }
      }
      console.log("filteredKits: ", filteredKits);
      return filteredKits;
    },
  },
  async created() {
    try {
      const kitsRewardsResponse = await getKitsRewardsController();
      if (kitsRewardsResponse.status) {
        this.kitsRewards = kitsRewardsResponse.data;
      }
    } catch (error) {
      console.error("Error loading kits rewards:", error);
    } finally {
      this.isLoading = false; // Actualizar el estado de carga
    }
  },
  methods: {
    getRewardUrl(reward) {
      return reward.url;
    },
    getRewardCost(reward) {
      return reward.metadata[0].metadata.costInPoints;
    },
    getRewardTitle(reward) {
      return reward.metadata[0].metadata.title;
    },
    getRewardDescription(reward) {
      return reward.metadata[0].metadata.description;
    },
    reedem(reward, type, kitId) {
      reward = { ...reward, type, kitId };
      console.log("reward in redeeem: ", reward);
      const encodedReward = encodeURIComponent(JSON.stringify(reward));
      this.$router.push({
        name: "reedemReward",
        query: { reward: JSON.stringify(reward) },
      });
    },
  },
};
</script>
<style>
#containerActiveRewards {
  background: rgba(0, 0, 0, 0.849);
  background: url(/src/assets/images/banner_hor.png) no-repeat center center
    fixed;
}

.activeRewardsTitle {
  padding: 20px;
  margin: 20px;
  text-align: center;
  font-weight: bolder;
  color: white;
  background-color: #33333385;
  border-radius: 10px;
}

#containerOfKitRewards {
  margin: 40px;
  padding: 50px;
  border-radius: 30px;

  background: url(/src/assets/images/lg-bck.png) no-repeat center center fixed;
  background-size: cover;
  /* height: 100vh; */
  /* display: flex;
  flex-direction: column; */
  align-items: center;
}

#containerOfKitRewardsTitle {
  display: flex;

  color: white;
  height: fit-content;
  justify-content: center;
  align-items: center;
}

#containerOfKitRewardsDescription {
  padding: 15px;
  display: flex;
  /* background: linear-gradient(87deg, rgb(236, 224, 160) 0, rgb(236, 221, 142) 50%) !important; */
  background-color: #4d4d4dc2;
  color: rgb(255, 255, 255);
  height: fit-content;
  justify-content: center;
  align-items: center;

  font-weight: bolder !important;

  border-radius: 10px;
}

.titleContainer {
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0 10px 0;
  color: white;
  font-weight: bolder;
  font-size: xx-large;
}

.containerShowRewards {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.cardShowRewards {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  transition: transform 0.2s;
}

.cardShowRewards:hover {
  transform: translateY(-5px);
}

.card-image-container {
  position: relative;
}

.card-img,
.custom-card-size model-viewer {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.redeem-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.award-cost {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #e69b0c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.redeem-button:hover {
  background-color: #0056b3;
}

.card-body {
  padding: 15px;
  text-align: center;
}

.card-title {
  font-size: 18px;
  margin: 10px 0;
  color: #333;
}

.card-text {
  font-size: 14px;
  color: #777;
}
.rewards-title {
  font-weight: bolder;
  font-size: 2.5rem;
  margin-bottom: 0 !important;
}

/* Estilos para la animación de carga */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* Altura completa de la ventana */
  background-color: rgba(255, 255, 255, 0.8);
  /* Fondo semitransparente */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.spinner {
  border: 8px solid #f3f3f3;
  /* Light grey */
  border-top: 8px solid #cda434;
  /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
