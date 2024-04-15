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
    
    if (!response.ok) {
      throw new Error(`Unable to generate a sticker with AI`);
    }
    const generatedStickerwithAI = await response.json();
    
    return generatedStickerwithAI;
  } catch (error) {
    throw error;
  }
};

async function saveSticker(stickerData) {
  try {
    const { stickerUrl, userID, prompt } = stickerData;
    const response = await fetch(`${RUTA_SERVIDOR}/rewards/saveSticker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stickerUrl,
        userID,
        prompt,
      }),
    });
    
    if (!response.ok) {
      throw new Error("Error saving sticker in Model.");
    }
    const kit = await response.json();

    return kit;
  } catch (error) {
    throw error;
  }
}

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


export { generateStickerWithAI, saveSticker, getStickers };
