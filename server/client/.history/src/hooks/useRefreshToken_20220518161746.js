import useAuth from "./useAuth";
import { refreshToken } from "../api/api";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const refreshTokenResponse = await refreshToken();
    if (refreshTokenResponse == null) {
    } else {
      setAuth((prev) => {
        console.log(refreshTokenResponse);
        return { ...prev, accessToken: refreshTokenResponse.data.accessToken, username: refreshTokenResponse.data.username };
      });
      return refreshTokenResponse.data.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
