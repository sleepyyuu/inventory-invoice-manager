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
        let randomNum = Math.floor(Math.random() * 10 + 10);
        if (randomNum + loadingProgress > 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoadingProgress(0);
          }, 1000);
        }
        setTimeout(() => {
          setActive(false);
        }, 700);
        return loadingProgress + randomNum;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [location]);
  return (
    <div>
      <div id="loadingBar" style={{ width: `${loadingProgress}vw`, opacity: `${active ? "1" : "0"}` }}></div>
      <Outlet></Outlet>
    </div>
  );
}
