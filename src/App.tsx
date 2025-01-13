import "./App.css";
import {
  useAuth,
  useAuthState,
  // useFeatureEntitlements,
  useFeatureFlags,
  useLoginWithRedirect,
  useLoginWithRedirectV2,
  useSignUpActions,
} from "@frontegg/react";
import LoginBtn from "./components/loginButton.tsx";
import Home from "./pages/home.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, Router } from "react-router-dom";

function App() {
  const { user, isLoading, isAuthenticated } = useAuthState();
  const loginWithRedirect = useLoginWithRedirectV2();

  useEffect(() => {
    console.log(`is load: ${isLoading}, is auth: ${isAuthenticated}`);
  }, [isLoading, isAuthenticated]);
  // const loginWithRedirect = useLoginWithRedirect();

  // useEffect(() => {
  //   const redirectUrl = window.localStorage.getItem(
  //     "FRONTEGG_AFTER_AUTH_REDIRECT_URL"
  //   );
  //   window.localStorage.removeItem("FRONTEGG_AFTER_AUTH_REDIRECT_URL");
  //   if (redirectUrl && isAuthenticated && !isLoading) navigate(redirectUrl);
  // }, [isAuthenticated, isLoading]);

  const navigate = useNavigate();
  const login = () => {
    navigate("/account/login");
  };

  // const signup = () => {
  //   navigate("https://app-kcj0djtbjuee.frontegg.com/oauth/account/login");
  // };

  // useEffect(() => {
  //   if (!isAuthenticated) login();
  // }, [isAuthenticated, login]);

  // useEffect(() => {
  //   if (!isAuthenticated) loginWithRedirect();
  // }, [isAuthenticated, loginWithRedirect]);

  return (
    <div className="App">
      {isAuthenticated && user ? <Home /> : <LoginBtn />}

      <button>
        <Link to="/page_1?show=section_1">Go to Page 1 - Section 1</Link>
      </button>
    </div>
  );
}

export default App;
