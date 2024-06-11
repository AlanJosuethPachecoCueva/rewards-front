<template>
    <div class="reward-editor">
        <h1>Edit Reward</h1>
        <div class="reward-image">
            <img v-if="reward.type != '3d'" :src="reward.url" alt="Reward Image" />
            <model-viewer v-else :src="reward.url" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom
                disable-rotate auto-rotate="0"></model-viewer>
        </div>
        <form @submit.prevent="updateReward">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="reward.metadata[0].metadata.title" required />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="reward.metadata[0].metadata.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="costInPoints">Cost in Points</label>
                <input type="number" id="costInPoints" v-model.number="reward.metadata[0].metadata.costInPoints"
                    required />
            </div>

            <button type="submit">Save Changes</button>
        </form>
    </div>
</template>

<script>
import { modifyReward } from '@/models/rewardModel';
import { getProductController } from "@/controllers/rewardsController";
import '@google/model-viewer';
export default {
    components: {
        'model-viewer': window.ModelViewer,
    },
    data() {
        return {
            reward: {
                url: '',
                metadata: [
                    {
                        metadata: {
                            title: '',
                            description: '',
                            costInPoints: 0,
                        }
                    }
                ],
                price: 0,
                stock: 0,
            },
            product: {}
        };
    },
    async created() {
        this.reward = JSON.parse(this.$route.query.reward);
        console.log("this.reward: ", this.reward);

        if (this.reward.type == "pr") {
            console.log("rerafegf");
            const parts = this.reward.metadata[0].name.split("/");
            let fileName = parts[parts.length - 1];

            this.product = await getProductController(fileName);

            console.log("this.product: ", this.product);
        }
    },
    methods: {
        async updateReward() {
            try {
                // Aquí deberías llamar a la función que actualiza los metadatos en Firebase
                const parts = this.reward.metadata[0].name.split("/");

                // Toma el último elemento del array resultante
                let fileName = parts[parts.length - 1];

                const data = {
                    type: this.reward.type,
                    fileName,
                    newTitle: this.reward.metadata[0].metadata.title,
                    newDescription: this.reward.metadata[0].metadata.description,
                    newCostInPoints: this.reward.metadata[0].metadata.costInPoints
                };

                console.log("data: ", data);
                const resp = await modifyReward(data);
                // Puedes mostrar un mensaje de éxito o redirigir a otra página
                console.log("resp: ", resp);
                const result = await this.$swal({
                    title: '¿Deseas modificar el premio?',
                    text: 'Se modificarán los parámetros indicados, esta acción no es reversible.',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: "No",
                });
                if (!result.isConfirmed) {
                    await this.$swal({
                        title: 'No se ha modificado',
                        text: "El objeto no se modificó.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    window.location.reload();
                    return;
                } else {
                    await this.$swal({
                        title: 'Premio modificado',
                        text: "El premio ha sido modificado satisfactoriamente.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });

                }
                this.$router.push({ path: '/admin/rewards' });
            } catch (error) {
                console.error("Error updating reward: ", error);
                // Puedes mostrar un mensaje de error
            }
        }
    }
};
</script>

<style scoped>
.reward-editor {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.reward-image {
    text-align: center;
    margin-bottom: 20px;
}

.reward-image img {
    max-width: 100%;
    border-radius: 10px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group textarea {
    resize: vertical;
}

button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}
</style>