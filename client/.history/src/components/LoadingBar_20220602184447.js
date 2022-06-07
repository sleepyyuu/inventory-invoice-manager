import "./LoadingBar.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function LoadingBar(props) {
  const { loadingProgress, setLoadingProgress } = props;
  const location = useLocation();

  return (
    <div>
      <div id="loadingBar" style={{ width: `${loadingProgress}vw` }}></div>
      <Outlet></Outlet>
    </div>
  );
}
