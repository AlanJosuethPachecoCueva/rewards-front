import {getUser} from "@/models/userModel";

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

export { getUserByIdController };
