import "./App.css";
import {
  useAuth,
  useAuthActions,
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
import { useLocation, useNavigate } from "react-router";
import { Link, Router, useSearchParams } from "react-router-dom";
import { Button } from "./components/ui/button.tsx";
import { IS_HOSTED } from "./main.tsx";

function App() {
  const { user, isLoading, isAuthenticated } = useAuthState();
  const loginWithRedirect = useLoginWithRedirectV2();
  const { requestAuthorize } = useAuthActions();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (searchParams.get("action") === "refresh") {
      console.log(searchParams);
    }
  }, [location.search]);

  useEffect(() => {
    console.log(`is load: ${isLoading}, is auth: ${isAuthenticated}`);
  }, [isLoading, isAuthenticated]);

  const navigate = useNavigate();
  const login = () => {
    navigate("/account/login");
  };

  // const signup = () => {
  //   navigate("https://app-kcj0djtbjuee.frontegg.com/oauth/account/login");
  // };

  useEffect(() => {
    if (!isAuthenticated) IS_HOSTED ? loginWithRedirect() : login();
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <div className="App">
      {isAuthenticated && user ? <Home /> : <LoginBtn />}
      <Button>
        <Link to="/signup">Sign up</Link>
      </Button>
      <br />

      <Button>
        <Link to="/page_1?show=section_1">Go to Page 1 - Section 1</Link>
      </Button>
    </div>
  );
}

export default App;
