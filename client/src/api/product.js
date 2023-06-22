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
