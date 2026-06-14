export interface OrganizationModel {
  organizationName: string;
  email: string;
  description: string;
  linkedInUrl: string;
  profilePhotoUrl: string;
}

export interface OrganizationParams {
  organizationName: string;
  description: string;
  profilePhotoUrl: string;
  linkedInUrl: string;
}
