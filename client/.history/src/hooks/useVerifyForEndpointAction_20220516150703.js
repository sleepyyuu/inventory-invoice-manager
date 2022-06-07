import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function useVerifyForEndpointAction() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const verify = async (action, route) => {
    if (!auth?.accessToken) {
      return navigate("/login");
    } else {
      try {
        if (action === "get") {
          const response = await axiosPrivate.get(route);
          return response.data;
        }
      } catch (err) {
        console.error(err);
        navigate("login", { state: { from: location }, replace: true });
      }
    }
  };
  return verify;
}
