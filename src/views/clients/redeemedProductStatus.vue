<template >
  <div id="template" class="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-if="productData && productData.deliveryInformation" class="card-redeem shadow-lg mb-3">
        <div class="card-redeem-header">
          <h5 class="card-redeem-title">Redeemed Product Status</h5>
        </div>
        <div class="card-redeem-body">
          <div class="row">
            <div class="col-md-4 leftRedeem">
              <img :src="productImageInformation.url" alt="Product Image" class="img-fluid rounded">
            </div>
            <div class="col-md-8 rightRedeem">
              <h5 class="card-redeem-text">Delivery Information</h5>
              <p><strong>Names:</strong> {{ productData.deliveryInformation.names }}</p>
              <p><strong>Email:</strong> {{ productData.deliveryInformation.email }}</p>
              <p><strong>Cellphone:</strong> {{ productData.deliveryInformation.cellphone }}</p>
              <p><strong>City:</strong> {{ productData.deliveryInformation.city }}</p>
              <p><strong>Street:</strong> {{ productData.deliveryInformation.street }}</p>
              <p><strong>Description:</strong> {{ productData.deliveryInformation.description }}</p>
              <div v-if="productData.deliveryStatus === 'Pending'" class="alert alert-warning">
                <strong>Status:</strong> Pending - Your order is being processed.
              </div>
              <div v-else-if="productData.deliveryStatus === 'Shipped'" class="alert alert-info">
                <strong>Status:</strong> Shipped - Your order is on the way.
              </div>
              <div v-else-if="productData.deliveryStatus === 'Delivered'" class="alert alert-success">
                <strong>Status:</strong> Delivered - Your order has been delivered.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="rewardProduct" class="card-redeem shadow-lg mb-3">
        <div class="card-redeem-header">
          <h5 class="card-redeem-title">Product Information</h5>
        </div>
        <div class="card-redeem-body">
          <div class="row">
            <div class="col-md-4 leftRedeem">
              <img :src="productImageInformation.url" alt="Product Image" class="img-fluid rounded">
            </div>
            <div class="col-md-8 rightRedeem">
              <h5 class="card-redeem-text">{{ rewardProduct.name }}</h5>
              <p><strong>Description:</strong> {{ rewardProduct.description }}</p>
              <p><strong>Cost in Points:</strong> {{ rewardProduct.costInPoints }}</p>
              <p><strong>Price:</strong> ${{ rewardProduct.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserProductController } from "@/controllers/usersController.js";
import { getProductController, getFileController } from "@/controllers/rewardsController.js";

export default {
  data() {
    return {
      productData: null,
      productImageInformation: null,
      rewardProduct: null,
      loading: true,
    };
  },
  async created() {
    const data = JSON.parse(this.$route.query.data);
    console.log("data query: ", data);

    try {
      this.productData = await getUserProductController(data.userId, data.fileName);
      console.log("this.productData: ", this.productData);

      this.productImageInformation = await getFileController({type: "pr", fileName: data.fileName});
      console.log("this.productImageInformation: ", this.productImageInformation);

      this.rewardProduct = await getProductController(data.fileName);
      console.log("this.rewardProduct: ", this.rewardProduct);
    } catch (error) {
      console.error("Error loading data: ", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
.rightRedeem{
  padding: 2% 0px 0% 0px;
}

.leftRedeem{
  display: flex !important;
  height: 100%;

  justify-content: center;
  align-items: center;
}

#template{
  height: 120%  !important;
  background-color: #181818;
}

.card-redeem-title{
  padding: 10px;
  text-align: center;
}



.card-redeem {
  margin: 5% 0px 5% 0px;
  max-width: 800px;
  width: 100%;
}
.card-redeem-header {
  background-color: rgb(65, 39, 39) !important;
  color: #ffffff;
  border-radius: 10px;
}
.card-redeem-body{
  background-color: white;
  border-radius: 10px;

  height: 381px;
}
.card-redeem-title {
  margin: 0;
}
.alert {
  margin-top: 15px;
}
.text-center {
  margin-top: 20px;
}
.col-md-8 p, .col-md-8 h5 {
  text-align: left;
}
</style>
