import { logout } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  return navigate("/login");
}
