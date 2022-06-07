import { axiosPrivate } from "../api/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken;
  const { auth } = useAuth();

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        //handle token expiration err or etc
        const prevRequest = error?.config;
      }
    );
  }, [auth, refresh]);

  return axiosPrivate;
}
