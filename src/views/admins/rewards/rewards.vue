<template>
    <!-- Sticker -->
    <div class="containerStickers">
        <h2 class="marginHeaders">Stickers</h2>

        <div class="input-group mb-3">
            <span class="searchButtons input-group-text" @click="goGenerateStickers()">Agregar</span>
            <input type="text" class="form-control" ref="searchInput" placeholder="Ingresa tu búsqueda">
            <span class="searchButtons input-group-text" @click="searchByType('sticker')">Buscar</span>
            
            
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
            <span class="searchButtons input-group-text" @click="goGenerate3DObjects()">Agregar</span>
            <input type="text" class="form-control" ref="searchInput3d" placeholder="Ingresa tu búsqueda">
            <span class="searchButtons input-group-text" @click="searchByType('3dObjects')">Buscar</span>
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
            <span class="searchButtons input-group-text" @click="searchByType('products')">Buscar</span>
            <input type="text" class="form-control" ref="searchInputProduct" placeholder="Ingresa tu búsqueda">
        </div>

        <carousel :items-to-show="4" :paginationEnabled="true">
            <Slide v-for="product in productsToShow" :key="product.title" class="carousel-slide p-2">
                <div class="card" style="width: 18rem">
                    <img :src="product.image" class="card-img-top imageCard" alt="Image" />
                    <div class="card-body">
                        <div class="minContentCard">
                            <h5 class="card-title">{{ product.title }}</h5>
                            <p class="card-text">
                                {{ product.description }}
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
import { getStickersController, get3DObjectsController } from "@/controllers/rewardsController";
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
            products: [
                { title: "Amor", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Famor.png?alt=media&token=683439b9-ebe8-438b-98cd-d3f0992afbb3" },
                { title: "Chocolate Caliente", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate-caliente.png?alt=media&token=16f4aca1-5072-43ac-b430-9f22bc4573fd" },
                { title: "Chocolate", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate.png?alt=media&token=ca44be8d-f140-446c-b666-4175f0b2bb2f" },
                { title: "Amor", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Famor.png?alt=media&token=683439b9-ebe8-438b-98cd-d3f0992afbb3" },
                { title: "Chocolate Caliente", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate-caliente.png?alt=media&token=16f4aca1-5072-43ac-b430-9f22bc4573fd" },
                { title: "Chocolate", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate.png?alt=media&token=ca44be8d-f140-446c-b666-4175f0b2bb2f" },
            ],
            productsToShow: [
                { title: "Amor", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Famor.png?alt=media&token=683439b9-ebe8-438b-98cd-d3f0992afbb3" },
                { title: "Chocolate Caliente", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate-caliente.png?alt=media&token=16f4aca1-5072-43ac-b430-9f22bc4573fd" },
                { title: "Chocolate", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate.png?alt=media&token=ca44be8d-f140-446c-b666-4175f0b2bb2f" },
                { title: "Amor", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Famor.png?alt=media&token=683439b9-ebe8-438b-98cd-d3f0992afbb3" },
                { title: "Chocolate Caliente", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate-caliente.png?alt=media&token=16f4aca1-5072-43ac-b430-9f22bc4573fd" },
                { title: "Chocolate", description: "Este sticker es un fantástico ejemplo", image: "https://firebasestorage.googleapis.com/v0/b/rewards-b63ba.appspot.com/o/stickers%2Fchocolate.png?alt=media&token=ca44be8d-f140-446c-b666-4175f0b2bb2f" },
            ],
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

        //Objetos 3D
        const threeDObjectsRes = await get3DObjectsController();
        console.log("threeDObjectsRes: ", threeDObjectsRes);
        // Agrega cada objeto de res a this.stickers
        threeDObjectsRes.forEach(object => {
            // Verifica si el título existe y no es una cadena vacía
            if (object.metadata[0].metadata.title) {
                this.threeDObjects.push(object);
            }
        });
        console.log("this.threeDObjects: ", this.threeDObjects);
        this.threeDObjectsToShow = JSON.parse(JSON.stringify(this.threeDObjects));
        console.log("this.threeDObjectsToShow: ", this.threeDObjectsToShow);
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
    },
};
</script>

<style>
.searchButtons {
    cursor: pointer;
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
