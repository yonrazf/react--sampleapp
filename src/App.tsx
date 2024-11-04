import "./App.css";
import { useAuth } from "@frontegg/react";
import LoginBtn from "./components/loginButton.tsx";
import Home from "./pages/home.tsx";

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && user ? <Home /> : <LoginBtn />}
    </div>
  );
}

export default App;
