import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

export default function PersistAuth() {
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();

  useEffect(() => {
    const refresh = useRefreshToken;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    //only get new token if no token in header
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet></Outlet>;
}
