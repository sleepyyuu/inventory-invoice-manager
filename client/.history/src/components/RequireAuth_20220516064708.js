import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  //check if user logged in or not
  const { auth } = useAuth();
  const location = useLocation();
  console.log("requireauth : " + auth);
  return auth?.accessToken ? <Outlet> </Outlet> : <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
