import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useVerifyForEndpointAction() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const verify = async (action, route, body = {}, allFlag) => {
    if (!auth?.accessToken) {
      return navigate("/login");
    } else {
      //switch statement here?
      if (action === "readAll") {
        console.log(allFlag);
        const response = await axiosPrivate.get(route).catch((err) => {
          if (allFlag) {
            return Promise.resolve(err);
          }
          console.log("test");
          return [err.message];
        });
        return response.data;
      } else if (action === "readDetail") {
      } else if (action === "create") {
        const response = await axiosPrivate.post(route, body).catch((err) => {
          return err.response.data.errors;
        });
        return response;
      } else if (action === "update") {
        const response = await axiosPrivate.post(route, body).catch((err) => {
          return err.response.data.errors;
        });
        return response;
      } else if (action === "delete") {
        const response = await axiosPrivate.delete(route, body).catch((err) => {
          //error as array
          return [err.response.data];
        });
        return response;
      }
    }
  };
  return verify;
}
