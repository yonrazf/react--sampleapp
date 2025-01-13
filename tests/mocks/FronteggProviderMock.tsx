import React, { createContext, useContext } from "react";
import { FronteggProvider, useAuth, useAuthUser } from "@frontegg/react";

// Create a mock context
const MockAuthContext = createContext({
  auth: {
    isAuthenticated: true,
    user: {
      id: "mockUserId",
      email: "mockuser@example.com",
      name: "Mock User",
    },
    login: jest.fn(),
    logout: jest.fn(),
  },
});

export const FronteggProviderMock: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MockAuthContext.Provider
      value={{
        auth: {
          isAuthenticated: true,
          user: {
            id: "mockUserId",
            email: "mockuser@example.com",
            name: "Mock User",
          },
          login: jest.fn(),
          logout: jest.fn(),
        },
      }}
    >
      <FronteggProvider contextOptions={{ baseUrl: "https://localhost:3000" }}>
        {children}
      </FronteggProvider>
    </MockAuthContext.Provider>
  );
};

// Example of using the mock hooks inside a component
export const useMockAuth = () => useContext(MockAuthContext);
