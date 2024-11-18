import { useLoginWithRedirect } from "@frontegg/react";
import { useNavigate } from "react-router";

export default function LoginBtn() {
  const loginWithRedirect = useLoginWithRedirect(); // -> for hosted
  const navigate = useNavigate();
  // const login = () => {
  //   loginWithRedirect();
  // };
  const login = () => {
    navigate("/account/login"); // for embedded
  };

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}
