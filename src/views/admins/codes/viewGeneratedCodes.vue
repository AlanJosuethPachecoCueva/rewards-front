<template>
    <div class="container">
        <div :style="{ backgroundColor: secondaryColor, color: textColor }" v-if="generatedCodes && generatedCodes.length > 0" class="alert alert-success mt-3" role="alert">
            Códigos generados:
        </div>
        <ul class="list-group mt-3">
            <li v-for="(code, index) in generatedCodes" :key="index"
                class="list-group-item d-flex justify-content-between align-items-center">
                {{ code }}
                <!-- Botón de copiar código opcional -->
                <button :style="{ backgroundColor: buttonColor }" type="button" class="btn btn-sm btn-primary ml-auto" @click="copyCode(code)">
                    Copiar
                </button>
            </li> 
        </ul>
    </div>
</template>

<script>
import { colors } from "/src/assets/colors.js";

export default {
    components: {},
    data() {
        return {
            logIn: true,
            generatedCodes: Array,
            secondaryColor: colors.darkBrown,
            buttonColor: colors.principalBrown,
            textColor: "#fff",
        };
    },
    created() {
        console.log("this.$route.params: ", this.$route.params);
        this.generatedCodes = JSON.parse(this.$route.params.generatedCodes);
        
        console.log("generatedCodes: ", this.generatedCodes);
        // Ahora puedes trabajar con salesInvoiceArray como un arreglo normal
    },

    methods: {
        switchButton() {
            // Tu lógica aquí
        },
        copyCode(code) {
            navigator.clipboard.writeText(code).then(() => {
                alert('Código copiado!');
            }).catch(err => {
                console.error('Error al copiar el código:', err);
            });
        },
    },
};
</script>

<style></style>
