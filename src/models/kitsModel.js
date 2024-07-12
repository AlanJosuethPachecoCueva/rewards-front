//Ruta para la api
const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

async function createKit(kitData) {
  try {
    const {
      author,
      description,
      startDate,
      endDate,
      images,
      mainImageUrl,
      title,
      slogans,
    } = kitData;

    const response = await fetch(`${RUTA_SERVIDOR}/kits/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        description,
        startDate,
        endDate,
        images,
        mainImageUrl,
        title,
        slogans,
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating project");
    }
    const kit = await response.json();

    return kit;
  } catch (error) {
    throw error;
  }
}

const getAllKits = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/kits/`);
    if (!response.ok) {
      throw new Error("Error fetching kits");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getAllKitsRewards = async () => {
  try {
    const response = await fetch(
      `${RUTA_SERVIDOR}/kits/getAllKitsWithRewards/`
    );
    if (!response.ok) {
      throw new Error("Error fetching kits");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getKit = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/kits/kit/${id}`);
    if (!response.ok) {
      throw new Error(`Unable to get kit ${id}`);
    }
    const kit = await response.json();
    return kit;
  } catch (error) {
    throw error;
  }
};

const getKitOpinionsAnalysis = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/evaluation_analysis/${id}`);
    if (!response.ok) {
      throw new Error(`Unable to get kit ${id} opinions`);
    }
    const results = await response.json();
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteKit = async (id) => {
  try {
    console.log("entrEa a deleteKit id: ", id);
    const response = await fetch(`${RUTA_SERVIDOR}/kits/kit/${id}`, {
      method: "DELETE",
    });
    console.log("response in deleteKit: ", response);
    if (!response.ok) {
      throw new Error(`Unable to get kit ${id}`);
    }
    return { msg: `Kit deleted ${id}` };
  } catch (error) {
    throw error;
  }
};

const generateKitWithAI = async (prompt) => {
  try {
    const response = await fetch(
      `${RUTA_SERVIDOR}/kits/generateKitAI/${prompt}`
    );
    if (!response.ok) {
      throw new Error(`Unable to generate kit with AI ${id}`);
    }
    const generatedKitwithAI = await response.json();
    return generatedKitwithAI;
  } catch (error) {
    throw error;
  }
};

const generateImageWithAI = async (prompt, userID) => {
  try {
    // Construye la URL con parámetros de consulta para prompt y userId
    const url = new URL(`${RUTA_SERVIDOR}/kits/generateImageAI`);
    url.searchParams.append("prompt", prompt);
    url.searchParams.append("userID", userID); // Asegúrate de pasar el userId cuando llames a esta función

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Unable to generate image with AI`);
    }
    const generatedImagewithAI = await response.json();
    return generatedImagewithAI;
  } catch (error) {
    throw error;
  }
};

const getKitsImages = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/kits/kitImages`);
    if (!response.ok) {
      throw new Error(`Unable to get kits images`);
    }

    const images = await response.json();
    return images;
  } catch (error) {
    throw error;
  }
};

async function uploadKitImage(image, userID, title, description) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("userID", userID);
  formData.append("title", title); // Ajusta según sea necesario
  formData.append("description", description); // Ajusta según sea necesario

  try {
    const response = await fetch(`${RUTA_SERVIDOR}/kits/uploadImage/`, {
      method: "POST",
      body: formData,
      headers: {
        // No es necesario establecer el encabezado "Content-Type" ya que fetch lo hará automáticamente cuando se utiliza FormData
      },
    });

    if (!response.ok) {
      throw new Error("Error uploading kit image");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
  }
}

async function updateKitImages(kitId, imageIds) {
  try {
    const response = await fetch(
      `${RUTA_SERVIDOR}/kits/updateKitImages/${kitId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageIds,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error updating kit images");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

async function updateKit(kitId, kitInfo) {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/kits/updateKit/${kitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kitInfo,
      }),
    });

    if (!response.ok) {
      throw new Error("Error updating kit");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export {
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
  getAllKitsRewards,
  getKitOpinionsAnalysis
};
