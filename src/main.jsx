import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FronteggProvider } from "@frontegg/react";

const baseUrl = import.meta.env.VITE_FE_BASE_URL;
const clientId = import.meta.env.VITE_FE_CLIENT_ID;
const appId = import.meta.env.VITE_FE_APP_ID;

const contextOptions = {
  baseUrl,
  clientId,
  appId,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
    <App />
  </FronteggProvider>
);