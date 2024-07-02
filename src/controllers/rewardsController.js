import {
  generateStickerWithAI,
  saveSticker,
  getStickers,
  saveStickerByFile,
  save3DObjectByFile,
  get3DObjects,
  getFile,
  assignRewardToKits,
  saveProduct,
  getProductsImages,
  deleteRewardsByRewardId,
  getAllKits_Rewards,
  reedemReward,
  modifyReward,
  modifyProduct,
  getProduct,
  getRedeemedProducts
} from "../models/rewardModel.js";

const generateStickerWithAIController = async (prompt, userID) => {
  try {
    const generatedSticker = await generateStickerWithAI(prompt, userID);

    if (!generatedSticker) {
      console.error("Error generating Sticker with AI controller: ", generatedSticker);
      return false;
    }

    return generatedSticker;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const saveStickerController = async (stickerData) => {
  try {
    const res = await saveSticker(stickerData);

    if (!res) {
      console.error("Error saving sticker in Controller.");
      return {status: false};
    }
    return {status: true, response: res};
  } catch (error) {
    console.error(error);
    return false;
  }
};

const saveStickerByFileController = async (stickerData) => {
  try {
    const res = await saveStickerByFile(stickerData);

    if (!res) {
      console.error("Error saving sticker in Controller.");
      return {status: false};
    }
    return {status: true, response: res};
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getStickersController = async () => {
  try {
    const images = await getStickers();

    if (!images) {
      console.error("Error getting sticker images");
      return false;
    }

    return images;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const save3DObjectByFileController = async (objectData) => {
  try {
    const res = await save3DObjectByFile(objectData);

    if (!res) {
      console.error("Error saving 3D object in Controller.");
      return false;
    }
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const get3DObjectsController = async () => {
  try {
    const threeDObjects = await get3DObjects();

    if (!threeDObjects) {
      console.error("Error getting 3D Objects");
      return false;
    }

    return threeDObjects;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getFileController = async (fileData) => {
  try {
    const file = await getFile(fileData);

    if (!file) {
      console.error("Error getting file in controller");
      return false;
    }

    return file;
  } catch (error) {
    console.error(error);
    return false;
  }
};


const assignRewardToKitsController = async (data) => {
  try {
    const res = await assignRewardToKits(data);

    if (!res) {
      console.error("Error assigning reward to kits.");
      return {status: false};
    }
    return {status: true, response: res};
  } catch (error) {
    console.error(error);
    return {status: false};
  }
};

const saveProductController = async (objectData) => {
  try {
    const res = await saveProduct(objectData);

    if (!res) {
      console.error("Error creating product in Controller.");
      return false;
    } 
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getProductsImagesController = async () => {
  try {
    const images = await getProductsImages();

    if (!images) {
      console.error("Error getting product images");
      return false;
    }

    return images;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteRewardsByRewardIdController = async (data) => {
  try {
    const response = await deleteRewardsByRewardId(data);
    console.log("response in deleteRewardsByRewardIdController: ", response);
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};


const getAllKits_RewardsController = async () => {
  try {
    const rewards = await getAllKits_Rewards();

    if (!rewards) {
      console.error("Error getting rewards");
      return false;
    }

    return rewards;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const reedemRewardController = async (data) => {
  try {
    const resp = await reedemReward(data);
    console.log("data in reedemRewardController: ", data);
    if (!resp) {
      console.error("Error reedeming reward");
      return false;
    }

    return resp;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const modifyRewardController = async (data) => {
  try {
    //console.log("data in modifyRewardController: ", data);
    const resp = await modifyReward(data);
    //console.log("resp in modifyRewardController: ", resp);
    if (!resp) {
      console.error("Error modifiying reward");
      return false;
    }

    return resp;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const modifyProductController = async (data) => {
  try {
    //console.log("data in modifyProduct: ", data);
    const resp = await modifyProduct(data);
    console.log("resp in modifyProductController: ", resp);
    if (!resp) {
      console.error("Error modifiying product");
      return false;
    }

    return resp;
  } catch (error) {
    console.error(error);
    return false;
  }
};


const getProductController = async (id) => {
  try {
    const product = await getProduct(id);

    if (!product) {
      console.error("Error getting product.");
      return false;
    }

    return product;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getRedeemedProductsController = async (id) => {
  try {
    const products = await getRedeemedProducts(id);

    if (!products) {
      console.error("Error getting redeemed products.");
      return false;
    }

    return products;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
  generateStickerWithAIController,
  saveStickerController,
  getStickersController,
  saveStickerByFileController,
  save3DObjectByFileController, 
  get3DObjectsController,
  getFileController,
  assignRewardToKitsController,
  saveProductController,
  getProductsImagesController,
  deleteRewardsByRewardIdController,
  getAllKits_RewardsController,
  reedemRewardController,
  modifyRewardController,
  modifyProductController,
  getProductController,
  getRedeemedProductsController
};
