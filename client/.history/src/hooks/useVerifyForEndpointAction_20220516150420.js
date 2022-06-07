import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useVerifyForEndpointAction() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const verify = async (action, route) => {
    const controller = new AbortController();
    if (!auth?.accessToken) {
      return navigate("/login");
    } else {
      if (action === "get") {
        const response = await axiosPrivate.get(route, { signal: controller.signal });
        return response.data;
      }
    }
  };
  return verify;
}
