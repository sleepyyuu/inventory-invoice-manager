import useAuth from "./useAuth";
import { refreshToken } from "../api/api";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const refreshTokenResponse = await refreshToken();
    if (refreshTokenResponse == null) {
    } else {
      setAuth((prev) => {
        console.log({ ...prev });
        return { ...prev, accessToken: refreshTokenResponse.data.accessToken };
      });
      return refreshTokenResponse.data.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
