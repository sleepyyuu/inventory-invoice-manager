import "./LoadingBar.css";
import { Outlet } from "react-router-dom";
export default function LoadingBar(props) {
  return (
    <div>
      <div id="loadingBar"></div>
      <Outlet></Outlet>
    </div>
  );
}
