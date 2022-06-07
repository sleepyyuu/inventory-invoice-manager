import useAuth from "./useAuth";
import { refreshToken } from "../api/api";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const refreshTokenResponse = await refreshToken();
    console.log(refreshTokenResponse);
    if (refreshTokenResponse == null) {
    } else {
      setAuth((prev) => {
        return { ...prev, accessToken: refreshTokenResponse.data.accessToken, username: refreshTokenResponse.data.username };
      });
      return refreshTokenResponse.data.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
