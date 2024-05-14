<template>
    <!-- Sticker -->
    <div class="containerStickers">
        <h2 class="marginHeaders">Stickers</h2>

        <div class="input-group mb-3">

            <span class="searchButtons input-group-text" @click="goViewStickersInTable()">
                <i class="bi bi-table" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>

            <span class="searchButtons input-group-text" @click="goGenerateStickers()">
                <i class="bi bi-file-earmark-plus" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>

            <input type="text" class="form-control" ref="searchInput" placeholder="Ingresa tu búsqueda">
            <span class="searchButtons input-group-text" @click="searchByType('sticker')">
                <i class="bi bi-search" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>


        </div>


        <carousel :items-to-show="4" :paginationEnabled="true">
            <Slide v-for="sticker in stickersToShow" :key="sticker.metadata[0].metadata.title"
                class="carousel-slide p-2">
                <div class="card" style="width: 18rem">
                    <img :src="sticker.url" class="card-img-top imageCard" alt="Image" />
                    <div class="card-body">
                        <div class="minContentCard">
                            <h5 class="card-title">{{ sticker.metadata[0].metadata.title }}</h5>
                            <p class="card-text">
                                {{ sticker.metadata[0].metadata.description }}
                            </p>
                        </div>

                    </div>
                </div>
            </Slide>
            <template #addons>
                <navigation />
                <pagination />
            </template>
        </carousel>
    </div>
    <!-- 3D Objects -->
    <div class="containerStickers">
        <h2 class="marginHeaders">3D Objects</h2>

        <div class="input-group mb-3">
            <span class="searchButtons input-group-text" @click="goViewObjectsInTable()">
                <i class="bi bi-table" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>
            <span class="searchButtons input-group-text" @click="goGenerate3DObjects()">
                <i class="bi bi-file-earmark-plus" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>
            <input type="text" class="form-control" ref="searchInput3d" placeholder="Ingresa tu búsqueda">
            <span class="searchButtons input-group-text" @click="searchByType('3dObjects')">
                <i class="bi bi-search" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>
        </div>

        <carousel :items-to-show="4" :paginationEnabled="true">
            <Slide v-for="object in threeDObjectsToShow" :key="object.metadata[0].metadata.title"
                class="carousel-slide p-2">
                <div class="card" style="width: 18rem">
                    <model-viewer :src="object.url" alt="Modelo 3D" disable-zoom disable-pan disable-touch-zoom
                        disable-rotate auto-rotate="0"></model-viewer>

                    <!-- <img :src="object.url" class="card-img-top imageCard" alt="Image" /> -->
                    <div class="card-body">
                        <div class="minContentCard">
                            <h5 class="card-title">{{ object.metadata[0].metadata.title }}</h5>
                            <p class="card-text">
                                {{ object.metadata[0].metadata.description }}
                            </p>
                        </div>

                    </div>
                </div>
            </Slide>
            <template #addons>
                <navigation />
                <pagination />
            </template>
        </carousel>
    </div>
    <!-- Products -->
    <div class="containerStickers">
        <h2 class="marginHeaders">Products</h2>

        <div class="input-group mb-3">
            <span class="searchButtons input-group-text" @click="goViewProductsInTable()">
                <i class="bi bi-table" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>
            <span class="searchButtons input-group-text" @click="goGenerateProducts()">
                <i class="bi bi-file-earmark-plus" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>
            <input type="text" class="form-control" ref="searchInputProduct" placeholder="Ingresa tu búsqueda">
            <span class="searchButtons input-group-text" @click="searchByType('products')">
                <i class="bi bi-search" style="
                    font-size: 1.2rem;
                    color: #000;
                    font-weight: bold;">
                </i>
            </span>

        </div>

        <carousel :items-to-show="4" :paginationEnabled="true">
            <Slide v-for="product in productsToShow" :key="product.metadata[0].metadata.title"
                class="carousel-slide p-2">
                <div class="card" style="width: 18rem">
                    <img :src="product.url" class="card-img-top imageCard" alt="Image" />
                    <div class="card-body">
                        <div class="minContentCard">
                            <h5 class="card-title">{{ product.metadata[0].metadata.title }}</h5>
                            <p class="card-text">
                                {{ product.metadata[0].metadata.description }}
                            </p>
                        </div>

                    </div>
                </div>
            </Slide>
            <template #addons>
                <navigation />
                <pagination />
            </template>
        </carousel>
    </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { getStickersController, get3DObjectsController, getProductsImagesController } from "@/controllers/rewardsController";
import '@google/model-viewer';

export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        'model-viewer': window.ModelViewer,
    },
    data() {
        return {
            logIn: true,
            stickers: [],
            stickersToShow: [],
            threeDObjects: [],
            threeDObjectsToShow: [],
            products: [],
            productsToShow: [],
        };
    },
    async mounted() {
        //Stickers
        const stickersRes = await getStickersController();

        // Agrega cada objeto de res a this.stickers
        stickersRes.forEach(sticker => {
            // Verifica si el título existe y no es una cadena vacía
            if (sticker.metadata[0].metadata.title) {
                this.stickers.push(sticker);
            }
        });

        this.stickersToShow = JSON.parse(JSON.stringify(this.stickers));
        console.log("this.stickersToShow : ", this.stickersToShow );
        //Objetos 3D
        const threeDObjectsRes = await get3DObjectsController();

        // Agrega cada objeto de res a this.stickers
        threeDObjectsRes.forEach(object => {
            // Verifica si el título existe y no es una cadena vacía
            if (object.metadata[0].metadata.title) {
                this.threeDObjects.push(object);
            }
        });

        this.threeDObjectsToShow = JSON.parse(JSON.stringify(this.threeDObjects));

        //Productos
        const productRes = await getProductsImagesController();

        // Agrega cada objeto de res a this.stickers
        productRes.forEach(object => {
            // Verifica si el título existe y no es una cadena vacía
            if (object.metadata[0].metadata.title) {
                this.products.push(object);
            }
        });

        this.productsToShow = JSON.parse(JSON.stringify(this.products));
    },
    methods: {
        searchByType(type) {
            if (type == "sticker") {
                const searchTerm = this.$refs.searchInput.value;
                this.search(this.stickers, this.stickersToShow, searchTerm);
            } else if (type == "3dObjects") {
                const searchTerm = this.$refs.searchInput3d.value;
                this.search(this.threeDObjects, this.threeDObjectsToShow, searchTerm);
            } else if (type == "products") {
                const searchTerm = this.$refs.searchInputProduct.value;
                this.search(this.products, this.productsToShow, searchTerm);
            }

        },
        search(original, listToShow, searchTerm) {
            listToShow.length = 0;
            console.log("original: ", original);
            original.filter((sticker) => {
                if (sticker.metadata[0].metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) || sticker.metadata[0].metadata.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    listToShow.push(sticker);
                } else {
                    console.log("No encontrado");
                }
            })
        },
        goGenerateStickers() {
            this.$router.push("/admin/generateStickers");
        },
        goGenerate3DObjects() {
            this.$router.push("/admin/generate3DObjects");
        },
        goGenerateProducts() {
            this.$router.push("/admin/generateProducts");
        },
        goViewStickersInTable() {
            this.$router.push("/admin/stickersTable");
        },
        goViewObjectsInTable() {
            this.$router.push("/admin/threeDObjectsTable");
        },
        goViewProductsInTable() {
            this.$router.push("/admin/productsTable");
        },
    },
};
</script>

<style>
.searchButtons {
    cursor: pointer;
    justify-content: center;
}

.containerStickers {
    margin: 20px 20px 0 20px;
}

.imageCard {
    max-width: 286px;
    max-height: 163px;
}

.minContentCard {

    height: 100px !important;
}

.marginHeaders {
    margin: 60px 0 10px 10px;
}
</style>
