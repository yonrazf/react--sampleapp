import { RouteObject } from "react-router";
import CustomFronteggProvider from "./customFronteggProvider";
import App from "./App";
import Page1 from "./pages/page1";
import LoginWithCustomSSO from "./components/loginWithCustomSSO";
import CustomSignUpForm from "./components/customSignUp";
import NotFoundPage from "./pages/notFoundPage";

const routes: RouteObject[] = [
  {
    path: "/*",
    element: <CustomFronteggProvider />,
    children: [
      { path: "account", element: <App /> },
      { path: "page_1", element: <Page1 /> },
      { path: "sso", element: <LoginWithCustomSSO /> },
      { path: "signup", element: <CustomSignUpForm /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export default routes;
