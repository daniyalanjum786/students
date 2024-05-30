import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const addProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/register`,
      productData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(errorMessage);
  }
};

const productService = { addProduct };
export default productService;
