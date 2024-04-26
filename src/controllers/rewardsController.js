import {
  generateStickerWithAI,
  saveSticker,
  getStickers,
  saveStickerByFile,
  save3DObjectByFile,
  get3DObjects
} from "../models/rewardModel.js";

const generateStickerWithAIController = async (prompt, userID) => {
  try {
    const generatedSticker = await generateStickerWithAI(prompt, userID);

    if (!generatedSticker) {
      console.error("Error generating Sticker with AI controller.");
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
      return false;
    }
    return res;
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
      return false;
    }
    return res;
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

export {
  generateStickerWithAIController,
  saveStickerController,
  getStickersController,
  saveStickerByFileController,
  save3DObjectByFileController, 
  get3DObjectsController,
};
