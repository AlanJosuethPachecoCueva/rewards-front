<template>
  <div class="titleContainer">
    <h1>Premios Disponibles</h1>
  </div>

  <div class="containerShowRewards">
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por título o descripción"
        class="search-bar"
      />
    </div>
    <div class="card-grid">
      <div
        v-for="reward in filteredRewards"
        :key="reward.url"
        class="cardShowRewards"
      >
        <div class="card-image-container">
          <div
            v-if="reward.metadata[0].id.includes('3DObjects')"
            class="custom-card-size"
          >
            <model-viewer
              :src="reward.url"
              alt="Modelo 3D"
              disable-zoom
              disable-pan
              disable-touch-zoom
              disable-rotate
              auto-rotate="0"
            ></model-viewer>
          </div>
          <div v-else>
            <img :src="reward.url" class="card-img" alt="Reward Image" />
          </div>
          <button
            class="redeem-button"
            @click="reedem(reward.metadata[0].id, reward)"
          >
            Redimir
          </button>
          <button class="award-cost" @click="">
            {{ reward.metadata[0].metadata.costInPoints }}
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
          <h5 class="card-title">{{ reward.metadata[0].metadata.title }}</h5>
          <p class="card-text">{{ reward.metadata[0].metadata.description }}</p>
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
} from "../../controllers/rewardsController";
import "@google/model-viewer";
export default {
  components: {
    // Registrar el componente importado
    "model-viewer": window.ModelViewer,
  },
  data() {
    return {
      logIn: true,
      rewards: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredRewards() {
      return this.rewards.filter((reward) => {
        const title = reward.metadata[0].metadata.title.toLowerCase();
        const description =
          reward.metadata[0].metadata.description.toLowerCase();
        const query = this.searchQuery.toLowerCase();
        return title.includes(query) || description.includes(query);
      });
    },
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
    reedem(rewardType, reward) {
      console.log("reedem rewardType: ", rewardType);

      const isObject = rewardType.includes("3DObjects");
      const isSticker = rewardType.includes("stickers");
      //const isProduct = rewardType.includes('products');

      let type = "";
      if (isObject) {
        type = "3d";
      } else if (isSticker) {
        type = "st";
      } else {
        type = "pr";
      }

      reward = {
        ...reward,
        type,
      };
      console.log("reward: ", reward);
      console.log("type: ", type);

      const encodedReward = encodeURIComponent(JSON.stringify(reward));
      console.log("encodedReward: ", encodedReward);
      this.$router.push({
        name: "reedemReward",
        query: { reward: JSON.stringify(reward) },
      });
    },
  },
};
</script>

<style>
.titleContainer {
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1% 0 1% 0;
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
</style>
