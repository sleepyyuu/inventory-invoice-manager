import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  //check if user logged in or not
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? <Outlet> </Outlet> : <Navigate></Navigate>;
};
