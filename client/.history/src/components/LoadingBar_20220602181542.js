import "./LoadingBar.css";
import { Outlet } from "react-router-dom";
export default function LoadingBar(props) {
  return (
    <div id="loadingBar">
      <Outlet></Outlet>
    </div>
  );
}
