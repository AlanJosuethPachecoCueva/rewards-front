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
      slogans
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
        slogans
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating project");
    }
    console.log("response: ", response);
    const kit = await response.json();
    
    console.log("Kit respuesta: ", kit);
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

const generateImageWithAI = async (prompt) => {
  try {
    const response = await fetch(
      `${RUTA_SERVIDOR}/kits/generateImageAI/${prompt}`
    );
    if (!response.ok) {
      throw new Error(`Unable to generate image with AI ${id}`);
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

// async function deleteProjectById(id) {
//   try {
//     const response = await fetch(`${RUTA_SERVIDOR}/projects/delete/${id}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       throw new Error("Error deleting project.");
//     }

//     const data = await response.text();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// const updateProject = async (id, projectData) => {
//   try {
//     const {
//       description,
//       state,
//       estimatedEndDate,
//       name,
//       startDate,
//       teamMembers,
//       teamName,
//     } = projectData;
//     const response = await fetch(`${RUTA_SERVIDOR}/projects/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id,
//         description,
//         state,
//         estimatedEndDate,
//         name,
//         startDate,
//         teamMembers,
//         teamName,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Error updating project");
//     }
//     return response.ok;
//   } catch (error) {
//     throw error;
//   }
// };

export { getAllKits, getKit, generateKitWithAI, generateImageWithAI, createKit, getKitsImages };
