import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useVerifyForEndpointAction() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const verify = async (action, route, body = {}) => {
    if (!auth?.accessToken) {
      return navigate("/login");
    } else {
      //switch statement here?
      if (action === "readAll") {
        const response = await axiosPrivate.get(route);
        return response.data;
      } else if (action === "readDetail") {
      } else if (action === "create") {
        const response = await axiosPrivate.post(route, body).catch((err) => {
          return err.response.data.errors;
        });

        return response;
      } else if (action === "update") {
      } else if (action === "delete") {
        const response = await axiosPrivate.delete("/products/62846e064117ac19c8312307", body).catch((err) => {
          return err.response.data;
        });
        return response;
      }
    }
  };
  return verify;
}
