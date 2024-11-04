import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { FronteggThemeOptions } from "@frontegg/react";
import { FronteggProvider } from "@frontegg/react";
import LangDropdown from "./components/langDropdown.js";

const baseUrl = import.meta.env.VITE_FE_BASE_URL;
const clientId = import.meta.env.VITE_FE_CLIENT_ID;
const appId = import.meta.env.VITE_FE_APP_ID;

const contextOptions = {
  baseUrl,
  clientId,
  appId,
};

const localizations = {
  en: {
    loginBox: {
      login: {
        title: "Log in",
        emailInputLabel: "Email",
        emailInputPlaceholder: "name@example.com",
        emailMustBeValid: "Must be a valid email",
        continue: "Continue",
        passwordInputLabel: "Password",
        forgotPassword: "Forgot your password?",
        passwordInputPlaceholder: "Password",
        login: "Log in",
        disclaimerText: "I agree to the",
        privacyLinkText: "Privacy Policy ",
      },
      activateAccount: {
        title: "Activate your account",
        newPasswordInputLabel: "New password",
        newPasswordInputPlaceholder: "Set password",
        confirmPasswordInputLabel: "Confirm new password",
        confirmPasswordInputPlaceholder: "Re-enter password",
        activateButton: "Activate",
        disclaimerCheckboxLabel: "I agree to the",
        privacyLinkText: "Privacy Policy",
      },
      forgetPassword: {
        title: "Forgot your password?",
        description:
          "Enter the email address associated with your account and we'll send you a link to reset your password",
        emailInputLabel: "Email",
        emailInputPlaceholder: "name@example.com",
        submitButtonText: "Remind me",
        backToLogin: "Back to login",
      },
      resetPassword: {
        title: "Reset password",
        description: "",
        newPasswordInputLabel: "New password",
        newPasswordInputPlaceholder: "Set password",
        confirmPasswordInputLabel: "Confirm new password",
        confirmPasswordInputPlaceholder: "Re-enter password",
        resetPasswordButton: "Reset password",
      },
    },
  },
  pt: {
    loginBox: {
      login: {
        title: "Iniciar sessão",
        emailInputLabel: "E-mail",
        emailInputPlaceholder: "nome@exemplo.com",
        emailMustBeValid: "Deve ser um e-mail válido",
        continue: "Continuar",
        passwordInputLabel: "Senha",
        forgotPassword: "Esqueceu sua senha?",
        passwordInputPlaceholder: "",
        login: "Iniciar sessão",
        disclaimerText: "Eu concordo com a",
        privacyLinkText: "Política de Privacidade",
      },
      activateAccount: {
        title: "Ative sua conta",
        newPasswordInputLabel: "Nova senha",
        newPasswordInputPlaceholder: "Definir senha",
        confirmPasswordInputLabel: "Confirmar nova senha",
        confirmPasswordInputPlaceholder: "Inserir senha novamente",
        activateButton: "Ativar",
        disclaimerCheckboxLabel: "Eu concordo com a",
        privacyLinkText: "Política de Privacidade",
      },
      forgetPassword: {
        title: "Esqueceu sua senha?",
        description:
          "Digite o endereço de e-mail associado a sua conta e enviaremos um link para redefinir sua senha",
        emailInputLabel: "E-mail",
        emailInputPlaceholder: "nome@exemplo.com",
        submitButtonText: "Lembre-me",
        backToLogin: "Voltar para iniciar sessão",
      },
      resetPassword: {
        title: "",
        description: "",
        newPasswordInputLabel: "",
        newPasswordInputPlaceholder: "",
        confirmPasswordInputLabel: "",
        confirmPasswordInputPlaceholder: "",
        resetPasswordButton: "",
      },
    },
  },
};

// Define the theme options with the custom footer box
const themeOptions: FronteggThemeOptions = {
  loginBox: {
    pageHeader: LangDropdown, // Assign the custom component to the boxFooter property
  },
  adminPortal: {
    components: {
      MuiChip: {
        styleOverrides: {
          label: {
            color: "#57c29b",
          },
        },
      },
    },
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <FronteggProvider
    contextOptions={contextOptions}
    hostedLoginBox={false}
    localizations={localizations}
    themeOptions={themeOptions}
  >
    <App />
  </FronteggProvider>
);
