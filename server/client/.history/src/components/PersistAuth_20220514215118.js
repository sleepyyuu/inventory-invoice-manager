import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken;
};
