import "./LoadingBar.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function LoadingBar(props) {
  const { loadingProgress, setLoadingProgress } = props;
  const location = useLocation();
  useEffect(() => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((loadingProgress) => {
        console.log(location);
        let randomNum = Math.floor(Math.random() * 20);
        if (randomNum + loadingProgress > 100) {
          clearInterval(interval);
        }
        return loadingProgress + Math.floor(Math.random() * 20);
      });
    }, 200);
    return () => clearInterval(interval);
  }, [location]);
  return (
    <div>
      <div id="loadingBar" style={{ width: `${loadingProgress}vw` }}></div>
      <Outlet></Outlet>
    </div>
  );
}
