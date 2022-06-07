import { axiosPrivate } from "../api/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken;
  const { auth } = useAuth();

  return axiosPrivate;
}
