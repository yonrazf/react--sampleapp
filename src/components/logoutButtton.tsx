const baseUrl = import.meta.env.VITE_FE_BASE_URL;
import { useNavigate } from "react-router";
import { ContextHolder } from "@frontegg/react";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    // window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`; // for hosted
    navigate("/account/logout"); // -> for embedded
  };

  return (
    <div>
      <button className="btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
