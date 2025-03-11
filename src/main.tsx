import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes.js";

export const IS_HOSTED = false;
const useProxy = false;

window.localStorage.setItem("FE_LOCAL_IS_HOSTED_MODE", `${IS_HOSTED}`);

const router = createBrowserRouter(routes);

let container: any = null;

document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("root") as HTMLElement;
    const root = ReactDOM.createRoot(container);
    root.render(<RouterProvider router={router} />);
  }
});
