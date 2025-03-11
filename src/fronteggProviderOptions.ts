import { FronteggThemeOptions } from "@frontegg/react";
import LangDropdown from "./components/langDropdown";

export const tenantResolver = () => {
  const urlQueryParams = new URLSearchParams(window.location.search);
  const organization = urlQueryParams.get("organization");
  return {
    tenant: organization,
  };
};

export const baseUrl = import.meta.env.VITE_FE_BASE_URL;
export const clientId = import.meta.env.VITE_FE_CLIENT_ID;
export const appId = import.meta.env.VITE_FE_APP_ID2;

export const contextOptions = {
  baseUrl,
  clientId,
  appId,
  tenantResolver,
};

export const localizations = {
  en: {
    errors: {
      "ER-04001": "Can't login",
    },
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
      socialLogins: {
        invalidTitle: "Custom message",
        failedBackToLogin: "hi",
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
export const themeOptions: FronteggThemeOptions = {
  loginBox: {
    // socialLogins: {
    //   containerStyle: {
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   },
    //   socialLoginsLayout: {
    //     mode: "eventually",
    //     showEventuallyButtonsWithText: true,
    //     eventuallyButtonsStyle: {
    //       width: "100%",
    //     },
    //   },
    // },
    login: {
      socialLogins: {
        containerStyle: {
          display: "flex",
          flexDirection: "column",
        },
        iconsOnly: false,
        socialLoginsLayout: {
          mode: "eventually",
          showEventuallyButtonsWithText: true,
          eventuallyButtonsStyle: {
            width: "100%",
          },
        },
      },
    },
    palette: {
      text: {
        secondary: "red",
        primary: "rgb(175, 90, 175)",
      },
    },
    boxMessageStyle: {
      color: "red",
    },
    layout: {
      // type: "float-left",
      // splitSize: 75,
      //   sideElement: () => {
      //     return (
      //       <div style={{ width: "150%", height: "100vh" }}>
      //         <img
      //           src="https://www.rollingstone.com/wp-content/uploads/2018/07/stevie-wonder-album-guide.jpg?w=1600&h=900&crop=1"
      //           alt="stevie"
      //         />
      //       </div>
      //     );
      //   },
      //   sideElementStyle: {
      //     width: "25%",
      //   },
    },
    pageHeader: LangDropdown,
    // logo: {
    //   image:
    //     // "https://www.udiscovermusic.com/wp-content/uploads/2020/09/Stevie-Wonder-GettyImages-84998958.jpg",
    // },
  },
  adminPortal: {
    navigation: {},
    components: {
      MuiDialog: {
        styleOverrides: {
          root: {
            overflow: "hidden",
          },
        },
      },
    },
    pages: {
      users: {
        inviteUserModal: {
          inviteByEmail: {
            fieldsProperties: {
              name: {
                settings: {
                  validation: {
                    required: false,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
export const events = {
  adminBoxMenuClicked: (payload: any) => {
    console.log("admin box menu clicked ");
    console.log(payload);
  },
};
