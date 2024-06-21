import {
  getAllKits,
  getKit,
  deleteKit,
  generateKitWithAI,
  generateImageWithAI,
  createKit,
  updateKit,
  getKitsImages,
  uploadKitImage,
  updateKitImages,
  getAllKitsRewards
} from "../models/kitsModel";

const createKitController = async (kitData) => {
  try {
    const res = await createKit(kitData);

    if (!res) {
      console.error("Error creating kit.");
      return false;
    }
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getKitsController = async () => {
  try {
    const kits = await getAllKits();

    if (!kits) {
      console.error("Error getting kits");
      return false;
    }

    return kits;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAllKitsRewardsController = async () => {
  try {
    const kits = await getAllKitsRewards();

    if (!kits) {
      console.error("Error getting kits with rewards");
      return false;
    }

    return kits;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const uploadImageController = async (image, userID, title, description) => {
  try {
    const res = await uploadKitImage(image, userID, title, description);

    if (!res) {
      console.error("Error uploading kit image");
      return false;
    }

    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateKitImagesController = async (kitId, imageIds) => {
  try {
    const res = await updateKitImages(kitId, imageIds);

    if (!res) {
      console.error("Error getting updating kit images");
      return false;
    }

    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateKitController = async (kitId, kitInfo) => {
  try {
    const res = await updateKit(kitId, kitInfo);

    if (!res) {
      console.error("Error getting updating kit");
      return false;
    }

    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getKitByIdController = async (id) => {
  try {
    const kit = await getKit(id);

    if (!kit) {
      console.error("Error getting kit.");
      return false;
    }

    return kit;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteKitByIdController = async (id) => {
  try {
    const msg = await deleteKit(id);

    if (!msg) {
      console.error("Error delettin kit.");
      return false;
    }

    return msg;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const generateKitWithAIController = async (prompt) => {
  try {
    const generatedKit = await generateKitWithAI(prompt);

    if (!generatedKit) {
      console.error("Error generating kit with AI.");
      return false;
    }

    return generatedKit;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const generateImageWithAIController = async (prompt, userID) => {
  try {
    const generatedImage = await generateImageWithAI(prompt, userID);

    if (!generatedImage) {
      console.error("Error generating image with AI.");
      return false;
    }

    return generatedImage;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getKitsImagesController = async () => {
  try {
    const images = await getKitsImages();

    if (!images) {
      console.error("Error getting kits images");
      return false;
    }

    return images;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getImagesFromKitsController = async (kits) => {
  try {
    const kitsImages = await getKitsImagesController();

    // Utilizamos Promise.all() para esperar a que todas las promesas se resuelvan
    const res = await Promise.all(kits.map(async (kit) => {

      // Utilizamos el método find() para buscar la imagen con el ID correspondiente
      let urlMainImage = kitsImages.find(
        (image) => image.metadata[0].id === kit.mainImageUrl
      );

      kit.mainImageUrl = urlMainImage.url;
      return kit;
    }));

    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export {
  getKitsController,
  deleteKitByIdController,
  getKitByIdController,
  updateKitController,
  generateKitWithAIController,
  createKitController,
  generateImageWithAIController,
  getKitsImagesController,
  updateKitImagesController,
  uploadImageController,
  getImagesFromKitsController,
  getAllKitsRewardsController
};
