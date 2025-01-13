import { useAuth, useTenantsState } from "@frontegg/react";
import AccessTokenBtn from "./accessToken";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { useAuthActions } from "@frontegg/react";

import { callSamlCallback } from "@/callSamlCallback";

//http://localhost:5173/account/activate?userId=00f5db8b-6835-46eb-91a9-a06ecf7495ed&token=c98bea5f-04e0-49f7-84bb-4f9000199bb5&redirectUrl=http%3A%2F%2Flocalhost%3A5173%2F%3Forganization%3Ditzik
//http://localhost:5173/account/sign-up?invitationToken=r59542EzB5EloJCsmEPpoolW4Kiw0dVDCdOUoI8VtcS33JaRHijnF8lnXw20LjiSSwlxARrKN3a0m6YZDx6A5JArr0ZhwLA1W4WoiLu4mRVanHP2duwOcuDezhJcpwNi
////
/* eslint-disable react/prop-types */
export default function UserDetails() {
  const { user } = useAuth();
  const { setUser } = useAuthActions();
  const { tenants } = useTenantsState();

  const openTabs = () => {
    const urls = [
      "http://localhost:5173/tab1",
      "http://localhost:5173/tab2",
      "http://localhost:5173/tab3",
    ];

    urls.forEach((url) => {
      const newTab = window.open(url, "_blank", "noopener,noreferrer");
      if (!newTab) {
        console.warn("Pop-up blocked for:", url);
      }
    });
  };

  const decoded = useMemo(() => {
    if (user) return jwtDecode(user?.accessToken) as typeof user;
    return "not found";
  }, [user]);

  return (
    user && (
      <div>
        <img
          width={200}
          height={200}
          style={{ objectFit: "cover" }}
          src={user.profilePictureUrl ?? ""}
          alt={user.name}
        />
        <div>
          <span>Logged in as {user.name}</span>
        </div>
        <h3 className=" text-xl text-white">
          YOU ARE IN TENANT:{" "}
          {tenants.find((t) => t.tenantId === user.tenantId)?.name}
        </h3>
        <br />
        <h3 className=" text-xl text-white">
          jwt tenant:{" "}
          {decoded !== "not found"
            ? tenants.find((t) => t.tenantId === decoded.tenantId)?.name
            : decoded}
        </h3>
        <h3 className=" text-xl text-white">
          jwt appId: {decoded !== "not found" ? decoded.applicationId : decoded}
        </h3>
        <br />

        <AccessTokenBtn />
        <button onClick={openTabs}>Open Tabs</button>
        <button onClick={callSamlCallback}>call saml callback</button>
      </div>
    )
  );
}
