import useAuth from "./useAuth";
import { refreshToken } from "../api/api";

export default async function useRefreshToken() {
  const { setAuth } = useAuth();
  const refreshTokenResponse = await refreshToken();
  setAuth((prev) => {
    return { ...prev, accessToken: refreshTokenResponse.data.accessToken };
  });
  return refreshTokenResponse.data.accessToken;
}
