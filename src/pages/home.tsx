import UserDetails from "../components/userDetails";
import UserActions from "../components/userActions";
import { useState } from "react";
import { useAuth } from "@frontegg/react";
import "./home.css";

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  const { user } = useAuth();
  return (
    <div>
      <div className="nav">
        <div>
          <img
            className="pfp"
            src={user?.profilePictureUrl ?? ""}
            style={{ zIndex: "1", borderRadius: "50%", cursor: "pointer" }}
            onClick={() => setShowModal((prev) => !prev)}
            width={60}
            alt={user?.name}
          />
        </div>

        <h1>Sample app</h1>
      </div>
      <div>
        <h2>Your permissions:</h2>
        {user?.permissions.map((perm) => (
          <p key={perm.id}>{perm.name}</p>
        ))}
      </div>
      <div style={{ position: "absolute", top: "3%", left: "4%" }}>
        {showModal && <UserModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

function UserModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="container">
      <button className="btn-close" onClick={onClose}>
        x
      </button>
      <UserDetails />
      <UserActions />
    </div>
  );
}
