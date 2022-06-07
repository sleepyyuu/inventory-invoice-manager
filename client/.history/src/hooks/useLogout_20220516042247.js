import { logoutEndpoint } from "../api/api";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
export default function useLogout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    setAuth({});
    await logoutEndpoint();
    return navigate("/login");
  };
  return logout;
}
