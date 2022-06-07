import useAuth from "./useAuth";
import { refreshToken } from "../api/api";

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refreshTokenResponse = refreshToken;
  setAuth((prev) => {
    console.log(JSON.stringify(prev));
    console.log(refreshTokenResponse);
    return { ...prev, accessToken: refreshTokenResponse.data.accessToken };
  });
  return refreshTokenResponse.data.accessToken;
}
