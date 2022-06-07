import useAuth from "./useAuth";
import { refreshToken } from "../api/api";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const refreshTokenResponse = await refreshToken();
    setAuth((prev) => {
      console.log(refreshTokenResponse.data.accessToken);
      return { ...prev, accessToken: refreshTokenResponse.data.accessToken };
    });
    return refreshTokenResponse.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
