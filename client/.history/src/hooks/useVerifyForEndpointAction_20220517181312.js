import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useVerifyForEndpointAction() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const verify = async (action, route) => {
    if (!auth?.accessToken) {
      return navigate("/login");
    } else {
      //switch statement here?
      if (action === "readAll") {
        const response = await axiosPrivate.get(route);
        console.log("test");
        return response.data;
      } else if (action === "readDetail") {
      } else if (action === "create") {
        const response = await axiosPrivate.post(route);
        return response.data;
      } else if (action === "update") {
      } else if (action === "delete") {
      }
    }
  };
  return verify;
}
