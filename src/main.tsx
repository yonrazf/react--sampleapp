import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { FronteggThemeOptions } from "@frontegg/react";
import { FronteggProvider } from "@frontegg/react";
import LangDropdown from "./components/langDropdown.js";
import {
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import Page1 from "./pages/page1/index.js";
import LoginWithCustomSSO from "./components/loginWithCustomSSO.js";
import { useEffect, useState } from "react";
import Loader from "./components/ui/loader.js";
import CustomSignUpForm from "./components/customSignUp.js";
import NotFoundPage from "./pages/notFoundPage.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CustomFronteggProvider from "./customFronteggProvider.js";
import routes from "./routes.js";

export const IS_HOSTED = false;
const useProxy = false;

window.localStorage.setItem("FE_LOCAL_IS_HOSTED_MODE", `${IS_HOSTED}`);

// window.addEventListener("storage", (e) => {
//   console.log(e);
//   if (e.key === "logout") {
//     window.location.href = "http://localhost:5173/account/logout";
//   }
// });

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/*" element={<CustomFronteggProvider />}>
//       <Route path="" element={<Navigate to={"account"} replace={true} />} />
//       <Route path="account" element={<App />} />
//       <Route path="page_1" element={<Page1 />} />
//       <Route path="sso" element={<LoginWithCustomSSO />} />
//       <Route path="signup" element={<CustomSignUpForm />} />
//       <Route path="*" element={<NotFoundPage />}></Route>
//     </Route>
//   )
// );

const router = createBrowserRouter(routes);

let container: any = null;

document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("root") as HTMLElement;
    const root = ReactDOM.createRoot(container);
    root.render(<RouterProvider router={router} />);
  }
});
