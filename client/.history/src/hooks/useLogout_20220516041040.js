import { logout } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function useLogout() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return navigate("/login");
}
