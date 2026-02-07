import { signal } from '@angular/core';

export interface RegistrationVolunteerInfo {
  name: string;
  lastname: string;
  birthdate: string;
  citizenship: string;
  languages: string;
  profession: string;
  interests: string;
  theme: string;
  email: string;
  password: string;
  skills: string;
}

export interface RegistrationOrganisationInfo {
  organisationName: string;
  email: string;
  password: string;
  description: string;
}
