<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card w-75">
        <div class="card-header">
          <h3>Redeemed Product Details</h3>
        </div>
        <div class="card-body">
          <div class="text-center mb-3">
            <img :src="product.image" :alt="product.fileName" class="img-fluid" style="max-height: 200px;">
          </div>
          <h4>{{ product.deliveryInformation.names }}</h4>
          <p><strong>City:</strong> {{ product.deliveryInformation.city }}</p>
          <p><strong>Address:</strong> {{ product.deliveryInformation.street }}, {{ product.deliveryInformation.description }}</p>
          <p><strong>Phone:</strong> {{ product.deliveryInformation.cellphone }}</p>
          <p><strong>Email:</strong> {{ product.deliveryInformation.email }}</p>
          <p><strong>Product Type:</strong> {{ product.type }}</p>
          <p>
            <strong>Delivery Status:</strong>
            <span :class="deliveryStatusClass">{{ product.deliveryStatus }}</span>
          </p>
          <div class="form-group">
            <label for="deliveryStatus">Change Delivery Status</label>
            <select id="deliveryStatus" class="form-control" v-model="product.deliveryStatus">
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button class="btn btn-primary" @click="updateDeliveryStatus">Manage</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {}
      };
    },
    created() {
      console.log("this.$route.params: ", this.$route.params);
      this.product = JSON.parse(this.$route.params.product);
      console.log("product: ", this.product);
    },
    computed: {
      deliveryStatusClass() {
        return {
          'badge badge-warning': this.product.deliveryStatus === 'Pending',
          'badge badge-success': this.product.deliveryStatus === 'Delivered',
          'badge badge-info': this.product.deliveryStatus === 'Shipped'
        };
      }
    },
    methods: {
      updateDeliveryStatus() {
        // Lógica para actualizar el estado de entrega en el servidor
        console.log("New delivery status:", this.product.deliveryStatus);
      }
    }
  };
  </script>
  
  <style scoped>
  .vh-100 {
    height: 100vh;
  }
  </style>
  