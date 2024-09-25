import { useLoginWithRedirect } from "@frontegg/react";

export default function LoginBtn() {
  const loginWithRedirect = useLoginWithRedirect();
  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
}
