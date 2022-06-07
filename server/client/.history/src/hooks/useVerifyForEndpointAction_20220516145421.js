import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useVerifyForEndpointAction(action, route) {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const verify = async () => {
    if (!auth?.accessToken) {
      return navigate("/login");
    } else {
      if (action === "get") {
        const response = await axiosPrivate.get(route, {});
        return response.data;
      }
    }
  };
  return verify;
}
