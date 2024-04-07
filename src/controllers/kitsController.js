import {
  getAllKits,
  getKit,
  generateKitWithAI,
  generateImageWithAI,
  createKit,
  getKitsImages,
  updateKitImages,
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
  console.log("Se ejecuta getKitsControllers");
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
      console.log("kitsImages: ", kitsImages);
      
      // Utilizamos Promise.all() para esperar a que todas las promesas se resuelvan
      const res = await Promise.all(kits.map(async (kit) => {
        console.log("kit.mainImageUrl: ", kit.mainImageUrl);
  
        // Utilizamos el método find() para buscar la imagen con el ID correspondiente
        let urlMainImage = kitsImages.find(
          (image) => image.metadata[0].id === kit.mainImageUrl
        );
        console.log("urlMainImage: ", urlMainImage.url);
        
        kit.mainImageUrl = urlMainImage.url;
        return kit;
      }));
  
      console.log("arregloDeObjetos result: ", res); // Imprime el arreglo de objetos normal
      
      return res;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  

export {
  getKitsController,
  getKitByIdController,
  generateKitWithAIController,
  createKitController,
  generateImageWithAIController,
  getKitsImagesController,
  updateKitImagesController,
  getImagesFromKitsController,
};
