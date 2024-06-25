import {
  getUser,
  getUserRewards,
  deleteUserById,
  getUserProduct,
} from "@/models/userModel";

const getUserByIdController = async (id) => {
  try {
    const user = await getUser(id);

    if (!user) {
      console.error("Error getting user in controller.");
      return false;
    }

    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteUserByIdController = async (id) => {
  try {
    const msg = await deleteUserById(id);

    if (!msg) {
      console.error("Error deliting user in controller.");
      return false;
    }

    return msg;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getUserRewardsController = async (id) => {
  try {
    const userRewards = await getUserRewards(id);

    if (!userRewards) {
      console.error("Error getting user rewards.");
      return false;
    }

    return userRewards;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getUserProductController = async (userId, fileName) => {
  try {
    const userProduct = await getUserProduct(userId, fileName);

    if (!userProduct.status) {
      console.error("Error getting user product.");
      return userProduct.message;
    }

    return userProduct.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export {
  getUserByIdController,
  getUserRewardsController,
  deleteUserByIdController,
  getUserProductController,
};
