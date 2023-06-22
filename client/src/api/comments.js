import axios from "axios";
import { URL } from "./constants";

export const createComment = async (productId, commentText) => {
  try {
    const { data } = await axios.post(`${URL}/comment`, {
      productId,
      commentText,
    });
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getComments = async (productId) => {
  try {
    const { data } = await axios.get(`${URL}/comment/${productId}`);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
