import { useAuthState, useLoginWithRedirect } from "@frontegg/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function LoginBtn() {
  const loginWithRedirect = useLoginWithRedirect(); // -> for hosted

  const isHosted =
    window.localStorage.getItem("FE_LOCAL_IS_HOSTED_MODE") === "true";

  const navigate = useNavigate();
  const login = () => {
    if (isHosted) loginWithRedirect();
    else navigate("/account/login");
  };
  // const login = () => {
  // navigate("/account/login"); // for embedded
  // };

  return (
    <div>
      <Button id="login" onClick={() => login()}>
        Login
      </Button>
    </div>
  );
}
