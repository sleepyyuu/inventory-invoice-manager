import { logout } from "../api/api";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  setAuth({});
  await logout();

  return navigate("/login");
};
