import useAuth from "./useAuth";
import { refreshToken } from "../api/api";
import { response } from "express";

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refreshTokenResponse = refreshToken;
  setAuth((prev) => {
    console.log(JSON.stringify(prev));
    console.log(refreshTokenResponse.data.accessToken);
    return { ...prev, accessToken: response.data.accessToken };
  });
  return <div></div>;
}
