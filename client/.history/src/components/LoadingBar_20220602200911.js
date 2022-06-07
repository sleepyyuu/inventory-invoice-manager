import "./LoadingBar.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function LoadingBar(props) {
  const { loadingProgress, setLoadingProgress } = props;
  const location = useLocation();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setLoadingProgress(0);
    setActive(true);
    const interval = setInterval(() => {
      setLoadingProgress((loadingProgress) => {
        let randomNum = Math.floor(Math.random() * 30 + 25);
        if (randomNum + loadingProgress > 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActive(false);
          }, 1000);
        }
        return loadingProgress + randomNum;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [location]);
  return (
    <div>
      <div id="loadingBar" style={{ width: `${loadingProgress}vw`, visibility: `${active ? "visible" : "hidden"}` }}></div>
      <Outlet></Outlet>
    </div>
  );
}
