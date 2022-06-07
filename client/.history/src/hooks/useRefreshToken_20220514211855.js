import useAuth from "./useAuth";
import { refreshToken } from "../api/api";
export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refreshTokenResponse = refreshToken;
  return <div></div>;
}
