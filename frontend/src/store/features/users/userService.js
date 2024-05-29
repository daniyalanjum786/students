import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(errorMessage);
  }
};

const userService = { getAllUsers };
export default userService;
