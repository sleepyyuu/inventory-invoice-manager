import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  //check if user logged in or not
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? <Outlet> </Outlet> : <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
