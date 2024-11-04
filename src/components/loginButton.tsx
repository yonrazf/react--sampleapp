import { useNavigate } from "react-router";

export default function LoginBtn() {
  const navigate = useNavigate();
  const login = () => {
    navigate("account/login");
  };

  return (
    <div>
      <button onClick={() => login()}>Login</button>
    </div>
  );
}
