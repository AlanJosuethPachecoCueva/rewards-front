import { saveMultipleCodes, redeemCode } from "../models/codesModel";

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
      return false;
    }
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { saveMultipleCodesController, redeemCodeController };
