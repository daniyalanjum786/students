import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const create = async (productsData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productsData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(errorMessage);
  }
};
const readAll = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
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
const readSingle = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`, {
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
const update = async ({ inputValues, productId }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${productId}`,
      inputValues,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
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

const deletePro = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${productId}`, {
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

const productService = { create, readAll, deletePro, readSingle, update };
export default productService;
