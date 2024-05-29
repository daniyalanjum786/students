import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(errorMessage);
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/logout`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(errorMessage);
  }
};

const authService = { loginUser, logoutUser };
export default authService;
