const baseUrl = import.meta.env.VITE_FE_BASE_URL;

export default function LogoutBtn() {
  const logout = () => {
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <div>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
