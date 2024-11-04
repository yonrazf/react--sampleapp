import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { copyToClipboard } from "../utils/copy";
import "./accessToken.css";
import { useAuth } from "@frontegg/react";

export default function AccessTokenBtn() {
  const { user } = useAuth();
  if (!user) return null;
  const [canViewToken, setCanViewToken] = useState(false);
  const [showToken, setShowToken] = useState(false);

  // example for how a custom permission might be used
  useEffect(() => {
    function getPermissions() {
      const decoded: any = jwtDecode(user!.accessToken);
      if (
        decoded.permissions?.find((str: string) => str === "access.token.read")
      ) {
        setCanViewToken(true);
      }
    }

    getPermissions();
  }, [user]);

  return (
    canViewToken && (
      <>
        {!showToken ? (
          <button onClick={() => setShowToken(true)}>
            What is my access token?
          </button>
        ) : (
          <div>
            <button className="btn-cancel" onClick={() => setShowToken(false)}>
              x
            </button>
            <div className="token-container">
              <p className="token-text">{user?.accessToken}</p>
            </div>
            <button
              className="btn-primary"
              onClick={() => copyToClipboard(user?.accessToken)}
            >
              Copy
            </button>
          </div>
        )}
      </>
    )
  );
}
