<template>
  <div class="background-image">
    <div class="container mt-5 d-flex justify-content-center">
      <div class="card p-4 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-center">{{ $t("redeemCode") }}</h2>
          <form @submit.prevent="redeemCode">
            <div class="mb-3">
              <label for="codeInput" class="form-label">{{ $t("entercode") }}</label>
              <input
                type="text"
                class="form-control"
                id="codeInput"
                v-model="code"
                :placeholder="$t('placeholderEnterCode')"
              />
            </div>
            <button type="submit" class="btn-redeem-code w-100">
              {{ $t("redeemButton") }}
            </button>
          </form>
          <div v-if="responseData && responseData.status" class="alert alert-success mt-3" role="alert">
            {{ $t("name") }}: {{ responseData.codeData.name }}<br />
            {{ $t("points") }}: {{ responseData.codeData.points }}
          </div>
          <div v-else-if="responseData && !responseData.status" class="alert alert-danger mt-3" role="alert">
            {{ $t("errorMessagesRedeem") }}
          </div>
          <div v-else class="alert alert-info mt-3" role="alert">
            {{ $t("messageredeemCode") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { redeemCodeController } from "@/controllers/codesController";
import { getUserByIdController } from "@/controllers/usersController";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
import fondoCacaoRedeem from "@/assets/images/fondoCacaoRedeem.jpeg"; // Importa la imagen

export default {
  data() {
    return {
      code: '',
      responseData: null,
      fondoCacaoRedeem, // Agrega la imagen a los datos
    };
  },
  setup() {
    const store = useUserStore();
    const user = computed(() => store.getUser);
    return { user };
  },
  methods: {
    async redeemCode() {
      let userId = this.user.id;
      let codee = this.code;
      const userStore = useUserStore();
      this.responseData = await redeemCodeController({ codeId: codee, userId: userId });
      let userByController = await getUserByIdController(this.user.id);
      userStore.setUser(userByController);
    },
  },
};
</script>

<style scoped>
/* Fondo de la vista */
.background-image {
  background: url(@/assets/images/fondoCacaoRedeem.jpeg) no-repeat center center fixed;
  background-size: cover;
  height: 100vh; /* Asegura que ocupe toda la altura de la vista */
  display: flex;
  align-items: center; /* Centra verticalmente el contenido */
}

/* Contenedor centrado */
.container {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

/* Estilos del card */
.card {
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  background: #ffffff; /* Fondo blanco para el card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra sutil para el card */
}

.card-body {
  padding: 20px;
}

/* Estilo del botón */
.btn-redeem-code {
  background-color: var(--principalBrown); /* Color de fondo inicial (dark brown) */
  color: white;
  border: none;
  border-radius: 20px;
}

.btn-redeem-code:hover {
  background-color: var(--darkBrown); /* Color de fondo al pasar el mouse (dark brown) */
}

.alert {
  display: block;
}
</style>
