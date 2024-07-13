//Ruta para la api
const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

async function saveMultipleCodes(data) {
  try {
    let {
      name,
      quantity,
      points,
      startDate,
      endDate,
      product,
      selectedKits,
    } = data;

    if(product == ""){
      product = " "
    }
    const response = await fetch(`${RUTA_SERVIDOR}/codes/saveMultipleCodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity,
        points,
        startDate,
        endDate,
        product,
        selectedKits,
      }),
    });

    if (!response.ok) {
      throw new Error("Error saving multiple codes");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

async function redeemCode(data) {
  try {
    console.log("data in redeemCode model: ", data);
    const { codeId, userId } = data;

    const response = await fetch(`${RUTA_SERVIDOR}/codes/redeemCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codeId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Error reedeming code");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

const getAllCodes = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/codes/`);
    if (!response.ok) {
      throw new Error("Error fetching codes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteCodeById = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/codes/delete/${id}`, {
      method: "DELETE",
    });

    console.log("response deleting code: ", response);
    if (!response.ok) {
      throw new Error("Error deleting code");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export { saveMultipleCodes, redeemCode, getAllCodes, deleteCodeById };
