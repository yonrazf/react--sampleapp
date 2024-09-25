import "./App.css";
import { useAuth } from "@frontegg/react";
import UserDetails from "./components/userDetails";
import UserActions from "./components/userActions";
import LoginBtn from "./components/loginButton";

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && user ? (
        <div className="container">
          <UserDetails user={user} />
          <UserActions />
        </div>
      ) : (
        <LoginBtn />
      )}
    </div>
  );
}

export default App;
