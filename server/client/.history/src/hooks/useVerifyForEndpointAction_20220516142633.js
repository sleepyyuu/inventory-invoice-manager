import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

export default async function useVerifyForEndpointAction() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  if (!auth?.accessToken) {
  }
}
