import axios from "axios";

const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      userData,
      {
        withCredentials: true, // Axios automatically sends cookies when using withCredentials
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(errorMessage);
  }
};

const authService = { loginUser };
export default authService;
