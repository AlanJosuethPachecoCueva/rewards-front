<template>
    <div>
      <h1>Get Redeemed Products</h1>
      <div class="cards-container">
        <div v-for="product in redeemedProducts" :key="product.fileName" class="card">
          <h2>{{ product.type.toUpperCase() }}</h2>
          <img :src="product.image" alt="Product Image" class="product-image"/>
          <p><strong>Associated Kit:</strong> {{ product.associatedKit }}</p>
          <p><strong>Names:</strong> {{ product.deliveryInformation.names }}</p>
          <p><strong>Email:</strong> {{ product.deliveryInformation.email }}</p>
          <p><strong>City:</strong> {{ product.deliveryInformation.city }}</p>
          <p><strong>Street:</strong> {{ product.deliveryInformation.street }}</p>
          <p><strong>Description:</strong> {{ product.deliveryInformation.description }}</p>
          <p>
            <strong>Status: </strong>
            <span :class="{'delivered': product.deliveryStatus.toLowerCase() === 'delivered', 'pending': product.deliveryStatus.toLowerCase() !== 'delivered'}">
              {{ product.deliveryStatus }}
            </span>
          </p>
          <button @click="manageProduct(product)">Manage</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getRedeemedProductsController } from "@/controllers/rewardsController.js"
  
  export default {
    data() {
      return {
        redeemedProducts: [],
      };
    },
    async created() {
      try {
        this.redeemedProducts = await getRedeemedProductsController();
        console.log("redeemedProducts:", this.redeemedProducts);
      } catch (error) {
        console.error("Error fetching redeemed products:", error);
      }
    },
    methods: {
      manageProduct(product) {
        // Implementar la lógica para gestionar el producto aquí
        console.log("Manage product:", product);
      },
    },
  };
  </script>
  
  <style scoped>
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .card {
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card h2 {
    margin-top: 0;
  }
  
  .card p {
    margin: 5px 0;
  }
  
  .card .product-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .card .delivered {
    color: green;
  }
  
  .card .pending {
    color: orange;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  