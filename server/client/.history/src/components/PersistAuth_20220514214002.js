import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const persistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
};
