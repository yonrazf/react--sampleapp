import LoginBtn from "@/components/loginButton";
import { useAuth, useAuthState } from "@frontegg/react";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Page1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const section = searchParams.get("show");
  const { user, isAuthenticated } = useAuth();
  const { isLoading } = useAuthState();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      window.localStorage.setItem(
        "FRONTEGG_AFTER_AUTH_REDIRECT_URL",
        `/page_1/${window.location.search.toString()}`
      );
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Page 1</h1>
      {section === "section_1" && <p>You're viewing Section 1.</p>}
      {user && isAuthenticated ? (
        <div className="text-2xl">You're authenticated as {user.name}</div>
      ) : (
        <>
          <div>Unauthenticated yet</div>
          <LoginBtn />
        </>
      )}
      <button onClick={() => navigate("/")}>Back to app</button>
    </div>
  );
};

export default Page1;
