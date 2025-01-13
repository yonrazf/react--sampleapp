const baseUrl = import.meta.env.VITE_FE_BASE_URL;
import { useNavigate } from "react-router";
import { ContextHolder } from "@frontegg/react";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const isHosted =
    window.localStorage.getItem("FE_LOCAL_IS_HOSTED_MODE") === "true";

  const logout = () => {
    if (!isHosted) {
      navigate("/account/logout");
    } else {
      try {
        const baseUrl = ContextHolder.getContext().baseUrl;
        window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`; // for hosted
      } catch (err) {
        window.location.href = `https://app-kcj0djtbjuee.frontegg.com/oauth/logout?post_logout_redirect_uri=${window.location}`;
      }
    }
  };

  return (
    <div>
      <button className="btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
