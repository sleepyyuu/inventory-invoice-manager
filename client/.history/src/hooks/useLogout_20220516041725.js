import { logout } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
export default async function useLogout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  setAuth({});
  await logout();

  return navigate("/login");
}
