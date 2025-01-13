// import { mockUseAuth, mockUseAuthUser } from "./mocks/frontegg-mocks";
import * as frontegg from "@frontegg/react";

// Mock Frontegg hooks globally
jest.mock("@frontegg/react", () => ({
  ...jest.requireActual("@frontegg/react"),
  useAuth: () => mockUseAuth(),
  useAuthUser: () => mockUseAuthUser(),
}));
