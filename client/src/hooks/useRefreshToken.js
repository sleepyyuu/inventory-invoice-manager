import useAuth from "./useAuth";
import { refreshToken } from "../api/api";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const refreshTokenResponse = await refreshToken();
    if (refreshTokenResponse == null) {
    } else {
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: refreshTokenResponse.data.accessToken,
          username: refreshTokenResponse.data.username,
          info: refreshTokenResponse.data.info,
        };
      });
      return refreshTokenResponse.data.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
