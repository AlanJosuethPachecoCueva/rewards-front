//Ruta para la api
const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

const generateStickerWithAI = async (prompt, userID) => {
  try {
    prompt =
      "Genera una imagen de un sticker caricaturezco, la imagen debe tener límites claros, la cual debe ser como una calcomanía, y debe cumplir con lo sigiuente: " +
      prompt;
    // Construye la URL con parámetros de consulta para prompt y userId
    const url = new URL(`${RUTA_SERVIDOR}/rewards/generateStickerAI`);
    url.searchParams.append("prompt", prompt);
    url.searchParams.append("userID", userID); // Asegúrate de pasar el userId cuando llames a esta función

    const response = await fetch(url.toString());
    console.log("response in generateStickerWithAI: ", response);
    if (!response.ok) {
      throw new Error(`Unable to generate a sticker with AI`);
    }
    const generatedStickerwithAI = await response.json();
    console.log("generatedStickerwithAI: ", generatedStickerwithAI);
    return generatedStickerwithAI;
  } catch (error) {
    throw error;
  }
};

const getStickers = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/getStickers`);
    if (!response.ok) {
      throw new Error(`Unable to get sticker images`);
    }

    const images = await response.json();
    return images;
  } catch (error) {
    throw error;
  }
};

async function saveSticker(stickerData) {
  try {
    const { stickerUrl, userID, prompt, costInPoints } = stickerData;
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/saveSticker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stickerUrl,
        userID,
        prompt,
        costInPoints,
      }),
    });

    if (!response.ok) {
      throw new Error("Error saving sticker in Model.");
    }
    const sticker = await response.json();

    return sticker;
  } catch (error) {
    throw error;
  }
}

async function saveStickerByFile(stickerData) {
  try {
    const { image, title, description, userID, costInPoints } = stickerData;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userID", userID); // Asegúrate de añadir userID correctamente
    formData.append("costInPoints", costInPoints);

    const response = await fetch(`${RUTA_SERVIDOR}/rewards/saveStickerByFile`, {
      method: "POST",
      // No establezcas manualmente el encabezado "Content-Type" aquí
      body: formData,
    });
    console.log("ResponSee_ ", response);
    if (!response.ok) {
      throw new Error("Error saving sticker by file in Model.");
    }
    const sticker = await response.json();

    return sticker;
  } catch (error) {
    throw error;
  }
}

async function save3DObjectByFile(objectData) {
  try {
    const { file, title, bundleFile, description, userID, costInPoints } = objectData;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bundleName", bundleFile.name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userID", userID);
    formData.append("costInPoints", costInPoints);

    const response = await fetch(`${RUTA_SERVIDOR}/rewards/save3DObjectFile`, {
      method: "POST",
      body: formData,
    });

    formData.set("file", bundleFile);
    const responseUnityAssets = await fetch(`${RUTA_SERVIDOR}/rewards/saveAssetBundle`, {
      method: "POST",
      body: formData,
    });

    console.log("response saving 3D object by file: ", response);
    if (!response.ok || !responseUnityAssets.ok) {
      throw new Error("Error saving 3D object by file.");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

const get3DObjects = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/get3DObjects`);
    if (!response.ok) {
      throw new Error(`Unable to get 3D Objects from firebase.`);
    }

    const threeDObjects = await response.json();
    return threeDObjects;
  } catch (error) {
    throw error;
  }
};

const getFile = async (fileData) => {
  try {
    const { type, fileName } = fileData;
    const response = await fetch(
      `${RUTA_SERVIDOR}/rewards/getFileFromStorage?type=${type}&fileName=${fileName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unable to get file`);
    }

    const file = await response.json();
    console.log("FILE recuperada: ", file);
    return file;
  } catch (error) {
    throw error;
  }
};

async function assignRewardToKits(data) {
  try {
    const { type, rewardId, kitsIds } = data;
    const response = await fetch(
      `${RUTA_SERVIDOR}/rewards/assignRewardToKits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          rewardId,
          kitsIds,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error assigning reward to kit.");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

async function saveProduct(productData) {
  try {
    const { name, description, price, costInPoints, userId, image, stock } =
      productData;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("costInPoints", costInPoints);
    formData.append("userId", userId);
    formData.append("imageFile", image);
    formData.append("stock", stock);

    const response = await fetch(`${RUTA_SERVIDOR}/rewards/saveProduct`, {
      method: "POST",
      body: formData,
    });

    if (!response.status) {
      throw new Error("Error saving product by file in Model.");
    }

    const product = await response.json();

    return product;
  } catch (error) {
    throw error;
  }
}

const getProductsImages = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/getProductImages`);
    if (!response.ok) {
      throw new Error(`Unable to get product images`);
    }

    const images = await response.json();
    return images;
  } catch (error) {
    throw error;
  }
};

const deleteRewardsByRewardId = async (data) => {
  try {
    const { rewardId, typeOfReward } = data;
    const response = await fetch(
      `${RUTA_SERVIDOR}/rewards/deleteRewardsByRewardId`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rewardId: rewardId,
          typeOfReward: typeOfReward,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Unable to delete rewards by rewardId: ${rewardId}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllKits_Rewards = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/kits_rewards`);
    if (!response.ok) {
      throw new Error("Error fetching kits_rewards");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const reedemReward = async (data) => {
  const { fileName, type, uid, associatedKit, names, email, cellphone, city, street, description } = data;

  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/reedemReward`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        type,
        associatedKit,
        uid,
        names, email, cellphone, city, street, description
      }),
    });

    if (!response.ok) {
      throw new Error("Error reedeming reward");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const modifyReward = async (data) => {
  const {
    type, fileName, newTitle, newDescription, newCostInPoints, newStock, newPrice,
  } = data;
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/updateReward`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type, fileName, newTitle, newDescription, newCostInPoints,
      }),
    });

    //const resultModifyProduct = await modifyProduct({price: newPrice, stock: newStock, fileName, costInPoints: newCostInPoints,});

    console.log("response in modifyReward: ", response);
    //console.log("resultModifyProduct: ", resultModifyProduct);
    if (!response.ok) {
      throw new Error("Error modifiying reward");
    }

    //const data = await response.json();
    const data = response;
    return data;
  } catch (error) {
    throw error;
  }
};

const modifyProduct = async (data) => {
  const { price, stock, fileName, newCostInPoints } = data;
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/updateProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        stock,
        fileName,
        costInPoints: newCostInPoints,
      }),
    });
    //console.log("response in modifyReward: ", response);
    if (!response.ok) {
      console.error("Error modifiying product in modifyProduct Model: ", response);
    }

    //const data = await response.json();
    const data = response;
    return data;
  } catch (error) {
    throw error;
  }
};

const getProduct = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/product/${id}`);
    if (!response.ok) {
      throw new Error(`Unable to get product ${id}`);
    }
    const product = await response.json();
    return product;
  } catch (error) {
    throw error;
  }
};

const getRedeemedProducts = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/reedemedProducts`);
    if (!response.ok) {
      throw new Error(`Unable to get product ${id}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    throw error;
  }
};

const updateShippingProductStatus = async (userId, fileName, newStatus) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/shippingProducts/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        fileName,
        newStatus,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Unable to update product status: ${errorData.message}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};


export {
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
  getRedeemedProducts,
  updateShippingProductStatus
};
