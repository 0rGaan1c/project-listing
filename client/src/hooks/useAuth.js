import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { validateToken } from "../api/auth";

export const useAuth = () => {
  const [cookie] = useCookies(["access_token"]);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const res = await validateToken({ token: cookie.access_token });
      if (res.status === "ok") {
        setIsTokenValid(true);
        setCheckingToken(false);
      } else {
        setCheckingToken(false);
      }
    };

    checkToken();
  }, [cookie.access_token]);

  if (cookie.access_token && !checkingToken) {
    return isTokenValid;
  }
};
