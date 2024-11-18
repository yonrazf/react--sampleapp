import { useAuth } from "@frontegg/react";
import AccessTokenBtn from "./accessToken";

/* eslint-disable react/prop-types */
export default function UserDetails() {
  const { user } = useAuth();
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
        <AccessTokenBtn />
      </div>
    )
  );
}
