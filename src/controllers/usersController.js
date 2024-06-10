import {getUser, getUserRewards} from "@/models/userModel";

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
export { getUserByIdController, getUserRewardsController };
