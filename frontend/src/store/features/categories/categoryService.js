import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const create = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/categories`, category, {
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
const readAll = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`, {
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
const readSingle = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/${slug}`, {
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
const update = async ({ name, slug }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/categories/${slug}`,
      { name },
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

const deleteCat = async (slug) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${slug}`, {
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

const categoryService = { create, readAll, deleteCat, readSingle, update };
export default categoryService;
