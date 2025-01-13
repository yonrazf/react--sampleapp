import * as frontegg from "@frontegg/react";
import { mockUseAuth, mockUseAuthUser } from "./tests/mocks/frontegg-mocks";
jest.mock("@frontegg/react", () => ({
  ...jest.requireActual("@frontegg/react"),
  useAuth: () => mockUseAuth(),
  useAuthUser: () => mockUseAuthUser(),
}));
