import "./LoadingBar.css";
import { Outlet } from "react-router-dom";
export default function LoadingBar(props) {
  const { loadingProgress } = props;
  return (
    <div>
      <div id="loadingBar" style={{ width: `${loadingProgress}vw` }}></div>
      <Outlet></Outlet>
    </div>
  );
}
