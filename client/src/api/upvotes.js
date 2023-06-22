import axios from "axios";
import { URL } from "./constants";

export const getUpvotes = async (productId) => {
  try {
    const { data } = await axios.get(`${URL}/upvote/${productId}`);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateUpvote = async (productId) => {
  try {
    const { data } = await axios.patch(`${URL}/upvote`, { productId });
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
