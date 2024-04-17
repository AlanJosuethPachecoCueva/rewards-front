import { generateStickerWithAI, saveSticker, getStickers, saveStickerByFile } from "../models/rewardModel.js";

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

export { generateStickerWithAIController, saveStickerController, getStickersController, saveStickerByFileController};
