export interface ITenantsResponse {
  id: string;
  name: string;
  deletedAt: null;
  metadata: any;
  tenantId: string;
  vendorId: string;
  isReseller: boolean;
  createdAt: Date;
  updatedAt: Date;
  address?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  currency?: string;
  logo?: string;
  logoUrl?: string;
}

export interface IRole {
  key: string;
}
export interface IPermission {
  key: string;
}

export interface IUserProfile {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  roles: IRole[];
  permissions: IPermission[];
  profilePictureUrl: string;
  type: string;
  iat: number;
  exp: number;
  aud: any;
  iss: string;
  id: any;
  metadata: string;
  mfaEnrolled: boolean;
  mfaBypass?: boolean;
  tenantId: string;
  tenantIds: string[];
  activatedForTenant?: boolean;
}
