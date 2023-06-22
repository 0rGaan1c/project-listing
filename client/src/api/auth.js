import axios from "axios";
import { URL } from "./constants";

export const signup = async (formData) => {
  try {
    const { data } = await axios.post(`${URL}/signup`, formData);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const login = async (formData) => {
  try {
    const { data } = await axios.post(`${URL}/login`, formData);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const validateToken = async (formData) => {
  try {
    const { data } = await axios.post(`${URL}/validatetoken`, formData);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
