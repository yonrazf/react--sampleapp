import jwtEncode from "jwt-encode";
import { v4 as uuid } from "uuid";
import { IPermission, IRole, ITenantsResponse, IUserProfile } from "./types";

const userId = uuid();
const aud = uuid();
const refreshToken = uuid();
const tenantUUID = uuid();

export type CreateDummyUserOptions = {
  verified?: boolean;
  roles?: IRole[];
  permissions?: IPermission[];
  metadata?: Record<string, any>;
  name?: string;
  email?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  isImpersonatedSession?: boolean;
  tenantData?: Partial<ITenantsResponse>;
};

export const createDummyUser = (options?: CreateDummyUserOptions) => {
  const expiresIn = 365000;
  const iat = new Date();
  const expires = new Date(iat.getMilliseconds() + expiresIn);
  const token = {
    sub: userId,
    name: options?.name || "Test User 1",
    email: options?.email || "test+1@frontegg.com",
    phoneNumber: options?.phoneNumber || "0523456789",
    email_verified: options?.verified ?? true,
    roles: options?.roles?.map((role) => role.key) ?? ["admin"],
    permissions: options?.permissions?.map((permission) => permission.key) ?? [
      "fe.*",
    ],
    metadata: options?.metadata ?? {},
    profilePictureUrl: options?.profilePictureUrl || "",
    tenantId: "my-tenant-id",
    tenantIds: ["my-tenant-id"],
    type: "userToken",
    iat: iat.getMilliseconds(),
    exp: expires.getMilliseconds(),
    aud,
    iss: "https://test.frontegg.com",
  };

  if (options?.isImpersonatedSession) {
    token["act"] = { sub: "demo+impersonated@frontegg.com" };
  }

  const refreshTokenResponse = {
    accessToken: jwtEncode(token, "abcdefg"),
    expires,
    expiresIn,
    refreshToken,
    mfaRequired: false,
  };

  const meResponse: IUserProfile = {
    ...token,
    id: userId,
    mfaEnrolled: false,
    metadata: JSON.stringify(options?.metadata ?? {}),
    roles: options?.roles ?? [],
    permissions: (options?.permissions ?? []) as any,
  } as any;

  const tenantsResponse: ITenantsResponse[] = [
    {
      address:
        '{"address1":"asdasd","address2":"asdasdasd","city":"asdasdasd","state":null,"postCode":null,"country":"Afghanistan"}',
      createdAt: new Date("2020-11-25T10:13:16.596Z"),
      currency: "USD",
      deletedAt: null,
      id: tenantUUID,
      metadata: "{}",
      name: "My Tenant Name",
      tenantId: "my-tenant-id",
      timezone: "Asia/Jerusalem",
      updatedAt: new Date("2021-09-20T23:21:46.021Z"),
      vendorId: aud,
      isReseller: false,
      ...(options?.tenantData ?? {}),
    },
  ];

  return {
    refreshTokenResponse,
    meResponse,
    tenantsResponse,
  };
};

export const IDENTITY_BASE_URL = "/frontegg/identity/resources";
export const USERS_BASE_URL = `${IDENTITY_BASE_URL}/users`;
export const TENANTS_INVITES_BASE_URL = `${IDENTITY_BASE_URL}/tenants/invites/v1`;
