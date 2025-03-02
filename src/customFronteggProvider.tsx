import {
  FronteggProvider,
  useAuth,
  useAuthActions,
  useLoginWithRedirectV2,
} from "@frontegg/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Loader from "./components/ui/loader";
import {
  contextOptions,
  events,
  localizations,
  themeOptions,
} from "./fronteggProviderOptions";
import { IS_HOSTED } from "./main";

function TopLevelApp() {
  const navigate = useNavigate();
  const loginWithRedirect = useLoginWithRedirectV2();
  const { isAuthenticated } = useAuth();

  const login = () => {
    navigate("/account/login");
  };

  useEffect(() => {
    if (!isAuthenticated) IS_HOSTED ? loginWithRedirect() : login();
  }, [isAuthenticated, loginWithRedirect]);
  return <h1>My App</h1>;
}

export default function CustomFronteggProvider() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Loader />}
      <FronteggProvider
        customLoader={setIsLoading}
        entitlementsOptions={{ enabled: true }}
        authOptions={{ keepSessionAlive: true, includeQueryParam: true }}
        contextOptions={contextOptions}
        localizations={localizations}
        themeOptions={themeOptions}
        events={events}
        hostedLoginBox={IS_HOSTED}
      >
        <>
          <TopLevelApp />
          <Outlet />
        </>
      </FronteggProvider>
    </>
  );
}
