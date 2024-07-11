<template>
  <div class="user-profile">
    <div class="user-info">
      <div class="avatar-container">
        <img class="avatar" :src="user.avatar" alt="User Avatar" @click="selectImage" />
      </div>
      <form @submit.prevent="updateUserProfile">
        <div class="form-group">
          <label for="name">Name:</label>
          <div class="d-flex">
            <input v-model="user.name" id="name" type="text" :disabled="!isEditing" class="form-control" />
            <button v-if="!isEditing" type="button" class="btn btn-link" @click="enableEditing">
              <i class="bi bi-pencil"></i> <!-- Bootstrap Icons para el lápiz -->
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="surname">Surname:</label>
          <input v-model="user.surname" id="surname" type="text" :disabled="!isEditing" class="form-control" />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="user.email" id="email" type="email" :disabled="!isEditing" class="form-control" />
        </div>

        <div v-if="isEditing">
          <button type="submit" class="btn btn-primary" @click="updateUserProfile">Save Changes</button>
          <button type="button" class="btn btn-secondary" @click="disableEditing">Cancel</button>
        </div>

        <p>{{ "If you want to erase your account press this button" }}</p>
        <button type="button" class="btn btn-primary btnGenerateKit" @click="confirmDeleteProfile">
          Delete Profile
        </button>
      </form>
    </div>
    <div class="rewards">
      <h3>Redimidos</h3>
      <div class="reward-items-container">
        <div class="reward-item" v-for="(item, index) in user.rewards" :key="index">
          <div v-if="item.type != '3d'" class="rewardCard">
            <div v-if="item.type == 'pr'" class="status-button">
              <button id="status-button" @click="goToRedeemedProductStatus(item.fileName)">Status</button>
            </div>
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
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../../models/firebase/config.js';
import { useUserStore } from '../../stores/userStore.js';
import { computed, reactive } from 'vue';
import { getUserByIdController, getUserRewardsController, deleteUserByIdController, updateUser } from '../../controllers/usersController';
import Swal from 'sweetalert2';
import '@google/model-viewer';

export default {
  data() {
    return {
      isEditing: false,  // Variable para controlar el estado de edición
    };
  },
  components: {
    'model-viewer': window.ModelViewer,
  },
  setup() {
    const store = useUserStore();
    const userStored = computed(() => store.getUser);

    const user = reactive({
      id: userStored.value.id,
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

    const loadData = async () => {
      try {
        const userData = await getUserByIdController(userStored.value.id);
        const rewardsWithUrls = await getUserRewardsController(userStored.value.id);
        user.avatar = userData.avatar || 'default-avatar.png';
        user.name = userData.name;
        user.surname = userData.surname;
        user.email = userData.email;
        user.rewards = rewardsWithUrls.data;
        rewards.gold = 272;
        rewards.silver = 2;
        rewards.bronze = 340;
        rewards.platinum = 1835;

        console.log('User data loaded: ', user);
      } catch (error) {
        console.error('Error loading user data: ', error);
      }
    };

    loadData();

    return { user, rewards };
  },
  methods: {
    enableEditing() {
      this.isEditing = true;
    },
    disableEditing() {
      this.isEditing = false;
    },
    async updateUserProfile() {
      try {
        await updateUser(this.user.id, {
          name: this.user.name,
          email: this.user.email,
          surname: this.user.surname,
        });
        this.isEditing = false;  // Deshabilitar la edición después de guardar los cambios
        Swal.fire('Success!', 'Your profile has been updated.', 'success');
      } catch (error) {
        console.error('Error updating user profile:', error);
        Swal.fire('Error!', 'There was a problem updating your profile.', 'error');
      }
    },
    async selectImage() {
      // Crear un nuevo input de archivo
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
          try {
            // Crea una referencia al almacenamiento de Firebase
            const fileRef = ref(storage, `avatars/${this.user.id}/${file.name}`);

            // Sube el archivo a Firebase Storage
            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Observa el progreso de la subida si es necesario
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
              },
              (error) => {
                console.error('Upload error:', error);
              },
              async () => {
                // Obtén la URL de descarga después de que se complete la subida
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                this.user.avatar = downloadURL;

                // Actualiza el avatar en tu base de datos
                const response = await fetch(`/api/users/${this.user.id}/avatar`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ avatar: downloadURL }),
                });

                if (!response.ok) {
                  throw new Error('Failed to update avatar');
                }

                const result = await response.json();
                console.log('Avatar updated:', result);
              }
            );
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      });
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    },
    goToRedeemedProductStatus(fileName) {
      console.log('goToRedeemedProductStatus fileName:', fileName);
      console.log('goToRedeemedProductStatus this.user.id:', this.user.id);
      const data = { userId: this.user.id, fileName };
      this.$router.push({
        name: 'redeemedProductStatus',
        params: data,
      });
    },
    async confirmDeleteProfile() {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover your account!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        this.deleteProfile();
      }
    },
    async deleteProfile() {
      try {
        await deleteUserByIdController(this.user.id);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    },
  },
};
</script>

<style scoped>
.rewardCard {
  position: relative;
  display: inline-block;
  border-radius: 10px;
}

.status-button {
  position: absolute;
  top: 8px;
  right: 8px;
}

#status-button {
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
  object-fit: cover;
  cursor: pointer; /* Cambiar el cursor a pointer para indicar que es clicable */
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

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer; /* Cambiar el cursor a pointer para indicar que es clicable */
}

#file-input {
  display: none; /* Ocultar el input de archivo */
}

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

.user-stats {
  display: flex;
  gap: 10px; /* Añadir espacio entre los elementos */
}

.stat {
  display: flex;
  align-items: center;
  gap: 5px; /* Añadir espacio entre el ícono y el texto */
}

.trophy {
  font-size: 24px; /* Ajustar el tamaño del ícono */
}

.trophy.gold {
  color: gold;
}

.trophy.silver {
  color: silver;
}

.trophy.bronze {
  color: #cd7f32;
}

.trophy.platinum {
  color: platinum;
}

.rewards {
  margin-top: 20px;
}

.reward-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Espacio entre los ítems */
}
</style>
