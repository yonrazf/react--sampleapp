import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { copyToClipboard } from "../utils/copy";
import { Toaster, toast } from "react-hot-toast";
import "./accessToken.css";
import { useAuth } from "@frontegg/react";
import { getToken } from "@/utils/getToken";
import { Button } from "./ui/button";
import UserJwt from "./UserJwt";

export default function AccessTokenBtn() {
  const { user } = useAuth();
  if (!user) return null;
  const [canViewToken, setCanViewToken] = useState(true);
  const [showToken, setShowToken] = useState(false);
  const [token, setToken] = useState<string>("");
  const [showDecoded, setShowDecoded] = useState(true);

  // example for how a custom permission might be used
  useEffect(() => {
    function getPermissions() {
      const decodedAT: any = jwtDecode(user!.accessToken);
      setToken(decodedAT);
    }

    getPermissions();
  }, [user]);

  const handleCopy = () => {
    try {
      const text = showDecoded ? token : user?.accessToken;
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
          <>
            <UserJwt jsonData={token} altTheme={false} />
            <Button onClick={() => setShowToken(false)}>
              Hide Access Token
            </Button>
          </>
        )}
        <Button onClick={getVendorToken}>Get new vendor token</Button>
        <Toaster position="top-right" />
      </>
    )
  );
}
