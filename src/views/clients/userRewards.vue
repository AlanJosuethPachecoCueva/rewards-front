<template>
  <div class="user-profile">
    <div class="user-info">


      <div class="user-card">
        <div class="avatar-container">
          <div v-if="user.avatar">
            <img class="avatar" :src="user.avatar" alt="User Avatar" @click="selectImage" />
          </div>
          <div v-else>
            <img class="avatar" src="../../assets/images/no-user-image-icon-27.png" alt="User Avatar"
              @click="selectImage" />
          </div>
        </div>
        <h2 class="user-name">{{ user.name }}</h2>
        <p class="user-email">{{ user.email }}</p>
        <button type="button" id="editUserInfoBtn" class="btn btn-link" @click="enableEditing">
          <i class="bi bi-pencil" style="font-size: 1rem;"></i> <!-- Bootstrap Icons para el lápiz -->
        </button>
      </div>
      <form @submit.prevent="updateUserProfile" v-if="isEditing" id="formEditUserInfo">
        <div class="form-group">
          <label for="name">Name:</label>
          <div class="d-flex">
            <input v-model="user.name" id="name" type="text" :disabled="!isEditing" class="form-control" />

          </div>
        </div>

        <div class="form-group">
          <label for="surname">Surname:</label>
          <input v-model="user.surname" id="surname" type="text" :disabled="!isEditing" class="form-control" />
        </div>

        <!-- <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="user.email" id="email" type="email" :disabled="!isEditing" class="form-control" />
          </div> -->

        <div v-if="isEditing" id="btnsEdit">
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
        <div v-if="isEmptyArray(user.rewards)" id="sinRedimir">
          Aún no has redimido ningún premio.
          <a id="linkRewards" aria-current="page" href="/rewards">Mira los premios activos aquí</a>
        </div>

        <div v-else class="reward-item" v-for="(item, index) in user.rewards" :key="index">
          <div v-if="item.type != '3d'" class="rewardCard">
            <div v-if="item.type == 'pr'" class="status-button">
              <button id="status-button" @click="goToRedeemedProductStatus(item.fileName)">Status</button>
            </div>
            <img :src="item.url" alt="Reward Image" />
            
          </div>
          <div v-else>
            <model-viewer :src="item.url" id="rewardCardFor3d" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom disable-rotate
              auto-rotate="0"></model-viewer>
          </div>
          <p>{{ item.metadata[0].metadata.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../../models/firebase/config.js';
import { useUserStore } from '../../stores/userStore.js';
import { computed, reactive } from 'vue';
import { getUserByIdController, getUserRewardsController, deleteUserByIdController, updateUserController, updateUserAvatarController } from '../../controllers/usersController';
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
      name: '',
      surname: '',
      email: '',
      rewards: [],
      user: {
        name: "John Smith",
        email: "john@example.com",
        avatar: "null" // Reemplaza con la URL de la imagen real
      }
    });

    const rewards = reactive({
      gold: 0,
      silver: 0,
      bronze: 0,
      platinum: 0,
    });

    const isEmptyArray = (arr) => {
      return arr.length === 0;
    }

    const loadData = async () => {
      try {
        const userData = await getUserByIdController(userStored.value.id);
        console.log("userData: ", userData);
        const rewardsWithUrls = await getUserRewardsController(userStored.value.id);
        console.log("rewardsWithUrls: ", rewardsWithUrls);
        user.avatar = userData.avatar;
        console.log("user.avatar:", user.avatar);
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

    return { user, rewards, isEmptyArray };
  },
  methods: {
    enableEditing() {
      this.isEditing = !this.isEditing;
    },
    disableEditing() {
      this.isEditing = false;
    },
    async updateUserProfile() {
      try {
        let data = {
          name: this.user.name,
          email: this.user.email,
          surname: this.user.surname,
        };
        console.log("data in update: ", data);
        await updateUserController(this.user.id, data);
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


                const result = await updateUserAvatarController(this.user.id, downloadURL);




                console.log('Avatar updated:', result);
                if (result.status) {
                  await this.$swal({
                    title: '¡Éxito!',
                    text: "Foto de usuario actualizada correctamente.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                  });
                } else {
                  await this.$swal({
                    title: '¡Error!',
                    text: result.message,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                  });
                }

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
#linkRewards{
  text-decoration: none !important;
color: #00a0a0 !important;
}

#sinRedimir {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#btnsEdit {
  display: flex;
  justify-content: space-around
}

#formEditUserInfo {
  height: 350px;
  margin: 20px 50px 20px 50px;
  padding: 20px 50px 20px 50px;
  background-color: #6e6a6a;
  border-radius: 5%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

}

#editUserInfoBtn {
  background-color: rgb(216, 198, 198);

}

.user-card {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 0 auto;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  margin: 10px 0 5px;
  color: #00a0a0;
  /* Cambia el color a tu preferencia */
}

.user-email {
  color: #888;
  font-size: 14px;
}

.rewardCard {
  position: relative;
  display: inline-block;
  border-radius: 10px;
  
}

#rewardCardFor3d{
  height: 250px;
  background-color: #f3ffff13;
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
  height: 100%;
}

.user-info {
  text-align: center;
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  /* Cambiar el cursor a pointer para indicar que es clicable */
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
  cursor: pointer;
  /* Cambiar el cursor a pointer para indicar que es clicable */
}

#file-input {
  display: none;
  /* Ocultar el input de archivo */
}



.user-info {
  text-align: center;
}

.user-stats {
  display: flex;
  gap: 10px;
  /* Añadir espacio entre los elementos */
}

.stat {
  display: flex;
  align-items: center;
  gap: 5px;
  /* Añadir espacio entre el ícono y el texto */
}

.trophy {
  font-size: 24px;
  /* Ajustar el tamaño del ícono */
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
  gap: 15px;
  /* Espacio entre los ítems */
}
</style>
