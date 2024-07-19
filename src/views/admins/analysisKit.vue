<template #addons>
  <statsComponent :statsData="metricsValues"></statsComponent>
  <div class="bigContainerKit">
    <h1 class="titulo-pagina">{{ pageTitle }}</h1>
    <div class="analysisContainer">
      <div class="containerLeft">
        <div class="form-group group">
          <label class="subtitle" for="description">Resumen</label>
          <p class="lead">{{ resumen }}</p>
        </div>
      </div>

      <div class="containerRight">
        <label class="subtitle" for="name">Factores</label>
        <div class="factors-container">
          <div v-for="(factor, index) in factorsList" :key="index" :class="['factor-card', getCardColor(index)]">
            <p class="factor-title" v-html="factor.title"></p>
            <p class="factor-text" v-html="factor.text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "../../stores/userStore.js";
import {
  getKitAnalysisIdController,
  getKitByIdController,
  getKitMetricsController,
  getKitRewardsMetricsController
} from "../../controllers/kitsController.js";
import statsComponent from "@/components/admin/statsComponent.vue";

export default {
  components: {
    statsComponent,
  },
  data() {
    return {
      resumen: null,
      pageTitle: null,
      factorsList: [],
      errors: [],
      metricsValues: {},
      kit: null,
    };
  },

  setup() {
    const store = useUserStore();
    const valueRes = computed(() => {
      return store.getUser;
    });

    const user = valueRes.value;
    return { user };
  },
  async created() {
    await this.getKit(this.$route.params.kitID);
    await this.getKitAnalysis(this.$route.params.kitID);
    await this.getMetrics(this.$route.params.kitID);
    
  },
  methods: {
    async getKitAnalysis(id) {
      try {
        const analysis = await getKitAnalysisIdController(id);
        console.log("Analisis " + JSON.stringify(analysis));
        //const resumen =
        //  "****\n\nTras analizar las opiniones recibidas, se destaca que la mayoría de los usuarios percibieron las imágenes como artificiales y poco relacionadas con el tema. Estas críticas sugieren que la calidad visual del material gráfico utilizado no logra transmitir de manera efectiva el mensaje o la temática deseada. Este aspecto puede afectar la percepción general de la marca o del contenido promocionado, ya que la imagen juega un papel crucial en la atracción y retención del público objetivo. Es fundamental tomar en cuenta estas opiniones para mejorar la estrategia visual y garantizar una experiencia positiva para los consumidores.";
        this.resumen = this.cleanText(analysis.resumen);
        //console.log(this.cleanText(analysis.factores));
        //const factores =
        //  "****\n\n1. **Calidad visual inadecuada:** La percepción de que las imágenes son artificiales sugiere una falta de autenticidad o realismo en el contenido visual. Esto puede generar desconfianza en la audiencia y afectar la credibilidad de la marca.\n\n2. **Relevancia con el tema:** La falta de conexión entre las imágenes y el tema tratado indica una posible discrepancia en la comunicación visual. Es esencial que el contenido gráfico se ajuste y refuerce el mensaje que se desea transmitir para evitar confusiones o malinterpretaciones.\n\n3. **Impacto emocional limitado:** Las imágenes artificiales tienden a carecer de la emotividad necesaria para generar un impacto significativo en la audiencia. La ausencia de una conexión emocional puede resultar en una menor resonancia y recordación de la publicidad o material promocional.\n\n4. **Coherencia visual:** La coherencia en el estilo, la paleta de colores y la estética general de las imágenes es fundamental para construir una identidad visual sólida y reconocible. La falta de cohesión visual puede afectar la percepción de la marca y dificultar la diferenciación en un mercado competitivo.\n\n5. **Optimización de la imagen:** Es importante considerar aspectos técnicos como la resolución, el formato y la adaptabilidad de las imágenes a diferentes plataformas y dispositivos. Una correcta optimización visual garantiza una experiencia uniforme y atractiva para los usuarios, así como una mejor visibilidad en entornos digitales.";
        this.factorsList = analysis.factores;
        console.log(this.factorsList);
      } catch (error) {
        console.error("Unable to find kit:", error);
        throw error;
      }
    },
    async getKit(id) {
      try {
        this.pageTitle = "Análisis Kit Publicitario: \n"; // + kit.title;
        // this.user = Object.assign({}, user);
      } catch (error) {
        console.error("Unable to find kit:", error);
        throw error;
      }
    },
    async getMetrics(id) {
      try {
        const metrics = await getKitMetricsController(id);
        if (!metrics) {
          throw new Error("Unable to find kit metrics");
        }
        console.log("metrics: ", metrics);
        this.metricsValues = metrics;
        const metricsRewards = await getKitRewardsMetricsController(id);
        cosole.log("metricsRewards: ", metricsRewards);
      } catch (error) { }
    },
    cleanText(text) {
      if (text) return text.replace(/^\*+/, "").trim();
      return text;
    },
    extractFactors(factores) {
      // Remove leading **** and split by pattern
      const parts = factores.split("\n\n").slice(1);
      const factors = parts.map((factor) => {
        factor = factor.replace(":", "");
        const pieces = factor.split("**");
        return {
          title: pieces[0] + pieces[1].toUpperCase(),
          description: pieces[2],
        };
      });
      console.log(factors);
      return factors;
    },
    getCardColor(index) {
      const colors = ["color1", "color2", "color3", "color4", "color5"];
      return colors[index % colors.length];
    },
  },
};
</script>

<style>
.titulo-pagina {
  font-weight: 1000;
}

.form {
  position: relative;
  padding: 0 5%;
}

.button {
  position: absolute;
  right: 5%;
  bottom: 0;
  background-color: #fbbc04;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 0.75% 2% 0.75% 2%;
}

.resumen {
  padding-top: 0px !important;
}

.label {
  font-weight: 1000;
  font-size: 1.2rem;
  margin-bottom: 0px !important;
}

.subtitle {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 0px !important;
  padding-top: 10px;
  padding-bottom: 20px;
}

.factor-label {
  font-weight: bold;
}

.title {
  font-size: 1.5em;
}

.analysisContainer {
  display: flex;
  flex-direction: column;
  margin-top: 0px !important;
}

.containerLeft,
.containerRight {
  width: 100%;
  padding-inline: 10px;
  padding-bottom: 20px;
}

.factor-card {
  padding: 40px 40px;
  border-radius: 8px;
  height: 300px;
  width: 40%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.factor-card::-webkit-scrollbar {
  display: none;
  overflow-y: auto;
}

.factor-text {
  text-align: justify;
}

.factor-title {
  align-self: center;
  font-weight: 1000;
  font-size: 1.2rem;
  margin-bottom: 0px !important;
}

.color1 {
  background-color: #aea1a8;
}

.color2 {
  background-color: #fbbc04;
}

.color3 {
  background-color: #95d0c1;
}

.color4 {
  background-color: #cfa36d;
}

.color5 {
  background-color: #83b655;
}

.factors-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

.lead {
  margin: 0;
}

.bigContainerKit {
  margin-top: 50px;
}
</style>
