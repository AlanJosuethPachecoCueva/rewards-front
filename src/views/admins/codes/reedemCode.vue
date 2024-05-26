<template>
    <div class="container mt-5">
        <h2>Redeem Your Code</h2>
        <form @submit.prevent="redeemCode">
            <div class="mb-3">
                <label for="codeInput" class="form-label">Enter your code:</label>
                <input type="text" class="form-control" id="codeInput" v-model="code"
                    placeholder="Enter your code here...">
            </div>
            <button type="submit" class="btn btn-primary">Redeem</button>
        </form>
        <div v-if="responseData && responseData.status" class="alert alert-success mt-3" role="alert">
            Name: {{ responseData.codeData.name }}
            Points: {{ responseData.codeData.points }}
        </div>
        <div v-else-if="responseData && !responseData.status" class="alert alert-danger mt-3" role="alert">
            Error: The code could not be redeemed.
        </div>
        <div v-else class="alert alert-info mt-3" role="alert">
            Please enter a code to redeem.
        </div>
    </div>
</template>


<script>
import { redeemCodeController } from "@/controllers/codesController";
import {getUserByIdController} from "@/controllers/usersController";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";

export default {
    data() {
        return {
            code: '',
            responseData: null,
        };
    },
    setup() {
        const store = useUserStore();
        const user = computed(() => {
            return store.getUser;
        });
        console.log("User at redeemCode: ", user);
        return { user };
    },
    mounted() {
        if (this.user != null) {
            console.log("User at navBar mounted: ", this.user.isAdmin);
        } else {
            console.log("No logueado");
        }

    },
    methods: {
        async redeemCode() {
            console.log("User at redeemCode in method: ", this.user.id);
            let userId = this.user.id;
            let codee = this.code;
            const userStore = useUserStore();
            this.responseData = await redeemCodeController({ codeId: codee, userId: userId });
            console.log("REs: ", this.responseData);

            let userByController = await getUserByIdController(this.user.id);

            userStore.setUser(userByController);

            
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: auto;
}

.alert {
    display: block;
    /* Cambia esto según sea necesario */
}

.d-none {
    display: none;
}
</style>
