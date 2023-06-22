import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { validateToken } from "../api/auth";

export const useAuth = () => {
  const [cookie] = useCookies(["access_token"]);

  if (cookie.access_token) {
    return true;
  } else {
    return false;
  }
};
