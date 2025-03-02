import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { copyToClipboard } from "../utils/copy";
import { Toaster, toast } from "react-hot-toast";
import "./accessToken.css";
import { useAuth } from "@frontegg/react";
import { getToken } from "@/utils/getToken";
import { Button } from "./ui/button";

export default function AccessTokenBtn() {
  const { user } = useAuth();
  if (!user) return null;
  const [canViewToken, setCanViewToken] = useState(true);
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
    try {
      const text = showDecoded ? decoded : user?.accessToken;
      copyToClipboard(text);
      toast.success("Copied text to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy text to clipboard");
    }
  };

  const getVendorToken = async () => {
    try {
      const token = await getToken();
      copyToClipboard(token);
      toast.success("Copied vendor token to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create a new vendor token");
    }
  };

  return (
    canViewToken && (
      <>
        {!showToken ? (
          <Button onClick={() => setShowToken(true)}>Show Access Token</Button>
        ) : (
          <div className="at-container">
            <Button className="btn-cancel" onClick={() => setShowToken(false)}>
              x
            </Button>
            <div className="token-container">
              {!showDecoded ? (
                <p className="token-text">{user?.accessToken}</p>
              ) : (
                <pre className="decoded">{decoded}</pre>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={() => setShowDecoded((prev) => !prev)}>
                {">"} {!showDecoded ? "Decoded" : "Encoded"}
              </Button>
              <Button className="btn-primary" onClick={handleCopy}>
                Copy
              </Button>
            </div>
          </div>
        )}
        <Button onClick={getVendorToken}>Get new vendor token</Button>
        <Toaster position="top-right" />
      </>
    )
  );
}
