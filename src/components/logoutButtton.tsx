const baseUrl = import.meta.env.VITE_FE_BASE_URL;
import { useNavigate } from "react-router";
import { ContextHolder, useAuth } from "@frontegg/react";
import { getToken } from "@/utils/getToken";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isHosted =
    window.localStorage.getItem("FE_LOCAL_IS_HOSTED_MODE") === "true";

  const logout = async () => {
    const token = await getToken();
    if (!isHosted) {
      await fetch(
        "https://api.frontegg.com/tenants/resources/users/sessions/v1/me/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "frontegg-user-id": user!.id,
          },
        }
      );
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
