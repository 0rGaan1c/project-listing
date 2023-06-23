import axios from "axios";
import { URL } from "./constants";

export const getProducts = async (categoryId) => {
  try {
    const { data } = await axios.get(`${URL}/product/${categoryId}`);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${URL}/category`);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const createProduct = async (formData) => {
  try {
    const { data } = await axios.post(`${URL}/product`, formData);
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateProduct = async (formData) => {
  try {
    const { data } = await axios.patch(`${URL}/product`, formData);
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
