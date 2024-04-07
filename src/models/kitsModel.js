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

const getKit = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/kits/kit/${id}`);
    if (!response.ok) {
      throw new Error(`Unable to get kit ${id}`);
    }
    const user = await response.json();
    return user;
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

// const generateImageWithAI = async (prompt) => {
//   try {
//     const response = await fetch(
//       `${RUTA_SERVIDOR}/kits/generateImageAI/${prompt}`
//     );
//     if (!response.ok) {
//       throw new Error(`Unable to generate image with AI ${id}`);
//     }
//     const generatedImagewithAI = await response.json();
//     return generatedImagewithAI;
//   } catch (error) {
//     throw error;
//   }
// };
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


export {
  getAllKits,
  getKit,
  generateKitWithAI,
  generateImageWithAI,
  createKit,
  getKitsImages,
  updateKitImages,
};
