import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  //check if user logged in or not
  const { auth } = useAuth();
  console.log(auth);
  const location = useLocation();

  return auth?.username ? <Outlet> </Outlet> : <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
