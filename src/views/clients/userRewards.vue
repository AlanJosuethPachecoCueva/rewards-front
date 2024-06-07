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
        <div class="reward-item" v-for="(item, index) in user.rewards.stickers" :key="index">
          <img :src="item.fileName" alt="Reward Image" />
          <p>{{ item.fileName }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from "../../stores/userStore.js";
  import { computed, reactive, onMounted } from "vue";
  import { getUserByIdController } from "../../controllers/usersController";
  
  export default {
    setup() {
      const store = useUserStore();
      const userStored = computed(() => store.getUser);
      const user = reactive({
        avatar: '',
        name: '',
        surname: '',
        email: '',
        rewards: {
          products: [],
          stickers: [],
          threeDObjects: [],
        },
      });
      const rewards = reactive({
        gold: 272,
        silver: 2,
        bronze: 340,
        platinum: 1835,
      });
  
      onMounted(async () => {
        const userData = await getUserByIdController(userStored.value.id);
        user.avatar = userData.avatar || 'default-avatar.png'; // Asigna un avatar por defecto si no hay uno
        user.name = userData.name;
        user.surname = userData.surname;
        user.email = userData.email;
        user.rewards = userData.rewards;
        console.log("User at userRewards mounted: ", user);
      });
  
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
  
  .reward-item {
    margin: 10px;
    text-align: center;
  }
  
  .reward-item img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  </style>
  