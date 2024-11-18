import { User } from "../types/userInvite";
import { useState } from "react";
import UserForm from "./userForm";
import "./bulkInvite.css";
import { getPersonalToken } from "../utils/getToken";
import { useAuth, useTenantsState } from "@frontegg/react";
export default function BulkInvite() {
  const { user: currentUser } = useAuth();

  const [userList, setUserList] = useState<User[]>([]);

  const addUser = (user: User) => {
    if (!userList.find((u) => u.email === user.email))
      setUserList((prev) => [...prev, user]);
  };

  const removeUser = (email: string) => {
    setUserList((prev) => prev.filter((u) => u.email != email));
  };

  const handleInvite = async () => {
    try {
      if (!currentUser) {
        console.error("Current user is null");
        return;
      }
      const token = await getPersonalToken(
        currentUser?.tenantId,
        currentUser?.id
      );
      const response = await fetch(
        "https://app-kcj0djtbjuee.frontegg.com/identity/resources/users/bulk/v1/invite",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "frontegg-tenant-id": currentUser.tenantId,
          },
          body: JSON.stringify({
            users: userList,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("error inviting users");
      }
      setUserList([]);
      alert("Users invited to tenant");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button disabled={userList.length < 1} onClick={handleInvite}>
        Invite Users
      </button>
      <UserForm addUser={addUser} />
      {userList.map((user) => (
        <>
          <div key={user.email} className="user-item">
            <div
              style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                marginLeft: "1rem",
              }}
            >
              <p style={{ fontWeight: 700 }}>{user.name}</p>
              <p>{user.email}</p>
            </div>
            <button
              className="btn-close"
              onClick={() => removeUser(user.email)}
            >
              -
            </button>
          </div>
        </>
      ))}
    </>
  );
}
