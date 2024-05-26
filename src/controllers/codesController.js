import { saveMultipleCodes, redeemCode, getAllCodes, deleteCodeById } from "../models/codesModel";

const saveMultipleCodesController = async (codesData) => {
  try {
    const res = await saveMultipleCodes(codesData);

    if (!res) {
      console.error("Error creating multiple codes.");
      return false;
    }
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const redeemCodeController = async (codesData) => {
  try {
    const res = await redeemCode(codesData);

    if (!res) {
      console.error("Error reedeming code.");
      return res;
    }
    return res;
  } catch (error) {
    console.error(error);
    return {status: false, message: "Error"};
  }
};

const getCodesController = async () => {
  try {
    const codes = await getAllCodes();

    if (!codes) {
      console.error("Error getting codes");
      return false;
    }

    return codes;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteCodeByIdController = async (id) => {
  try {
    const res = await deleteCodeById(id);

    if (!res) {
      console.error("Error deleting codes");
      return {status: false, message: "Error"};
    }

    return {status: true, message: "Deleted successfully!", response: res};
  } catch (error) {
    console.error(error);
    return {status: false, message: "Error", error};
  }
};

export { saveMultipleCodesController, redeemCodeController, getCodesController, deleteCodeByIdController };
