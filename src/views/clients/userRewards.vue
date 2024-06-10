<template>
  <div class="user-profile">
    <div class="user-info">
      <img class="avatar" :src="user.avatar" alt="User Avatar" />
      <h2>{{ user.name }} {{ user.surname }}</h2>
      <p>{{ user.email }}</p>
      <div class="user-stats">
        <div class="stat">
          <span class="trophy gold">🏆</span>
          <span>{{ rewards.gold }}</span>
        </div>
        <div class="stat">
          <span class="trophy silver">🏆</span>
          <span>{{ rewards.silver }}</span>
        </div>
        <div class="stat">
          <span class="trophy bronze">🏆</span>
          <span>{{ rewards.bronze }}</span>
        </div>
        <div class="stat">
          <span class="trophy platinum">🏆</span>
          <span>{{ rewards.platinum }}</span>
        </div>
      </div>
    </div>
    <div class="rewards">
      <h3>Recently Played</h3>
      <div class="reward-items-container">
        <div class="reward-item" v-for="(item, index) in user.rewards" :key="index">
          <div v-if="item.type != '3d'">
            <img :src="item.url" alt="Reward Image" />
            <p>{{ item.metadata[0].metadata.title }}</p>
          </div>
          <div v-else>
            <model-viewer :src="item.url" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom disable-rotate
              auto-rotate="0"></model-viewer>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/userStore.js";
import { computed, reactive } from "vue";
import { getUserByIdController, getUserRewardsController } from "../../controllers/usersController";
import '@google/model-viewer';

export default {
  components: {
    'model-viewer': window.ModelViewer,
  },
  setup() {
    const store = useUserStore();
    const userStored = computed(() => store.getUser);

    // Creamos los datos iniciales reactivos
    const user = reactive({
      avatar: 'default-avatar.png',
      name: '',
      surname: '',
      email: '',
      rewards: [],
    });

    const rewards = reactive({
      gold: 0,
      silver: 0,
      bronze: 0,
      platinum: 0,
    });

    // Cargamos los datos del usuario y sus recompensas
    const loadData = async () => {
      try {
        const userData = await getUserByIdController(userStored.value.id);
        const rewardsWithUrls = await getUserRewardsController(userStored.value.id);
        user.avatar = userData.avatar || 'default-avatar.png';
        user.name = userData.name;
        user.surname = userData.surname;
        user.email = userData.email;
        user.rewards = rewardsWithUrls.data;
        rewards.gold = 272; // Asigna los valores reales
        rewards.silver = 2;
        rewards.bronze = 340;
        rewards.platinum = 1835;
        console.log("User data loaded: ", user);
      } catch (error) {
        console.error("Error loading user data: ", error);
      }
    };

    // Llamamos a la función para cargar los datos cuando el componente se inicializa
    loadData();

    // Devolvemos los datos y los métodos que queremos hacer accesibles en el template
    return { user, rewards };
  },
};
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: #181818;
  padding: 20px;
}

.user-info {
  text-align: center;
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trophy {
  font-size: 24px;
}

.gold {
  color: gold;
}

.silver {
  color: silver;
}

.bronze {
  color: #cd7f32;
}

.platinum {
  color: #e5e4e2;
}

.rewards {
  margin-top: 20px;
  width: 100%;
}

.reward-items-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 0px;
}

.reward-item {
  margin: 10px;
  text-align: center;
}

.reward-item img {
  width: 250px;
  height: 250px;
  border-radius: 10px;
}
</style>
