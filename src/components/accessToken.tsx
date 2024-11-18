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
  const [decoded, setDecoded] = useState<string>("");
  const [showDecoded, setShowDecoded] = useState(true);

  // example for how a custom permission might be used
  useEffect(() => {
    function getPermissions() {
      const decodedAT: any = jwtDecode(user!.accessToken);
      setDecoded(JSON.stringify(decodedAT, null, 2));
      if (
        decodedAT.permissions?.find(
          (str: string) => str === "access.token.read"
        )
      ) {
        setCanViewToken(true);
      }
    }

    getPermissions();
  }, [user]);

  const handleCopy = () => {
    const text = showDecoded ? decoded : user?.accessToken;
    copyToClipboard(text);
  };

  return (
    canViewToken && (
      <>
        {!showToken ? (
          <button onClick={() => setShowToken(true)}>Show Access Token</button>
        ) : (
          <div className="at-container">
            <button className="btn-cancel" onClick={() => setShowToken(false)}>
              x
            </button>
            <div className="token-container">
              {!showDecoded ? (
                <p className="token-text">{user?.accessToken}</p>
              ) : (
                <pre className="decoded">{decoded}</pre>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button onClick={() => setShowDecoded((prev) => !prev)}>
                {">"} {!showDecoded ? "Decoded" : "Encoded"}
              </button>
              <button className="btn-primary" onClick={handleCopy}>
                Copy
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
