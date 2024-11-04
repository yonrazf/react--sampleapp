const baseUrl = import.meta.env.VITE_FE_BASE_URL;
import { useNavigate } from "react-router";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const logout = () => {
    navigate(`account/logout`);
  };

  return (
    <div>
      <button className="btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
