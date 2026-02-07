import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RegistrationOrganisationInfo, RegistrationVolunteerInfo } from './registration.model';
import { form, FormField } from '@angular/forms/signals';
import { Volunteer } from './components/volunteer/volunteer';
import { Organization } from './components/organization/organization';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

export const fields: (keyof RegistrationVolunteerInfo)[] = [
  'name',
  'lastname',
  'birthdate',
  'citizenship',
  'languages',
  'profession',
  'interests',
  'theme',
  'email',
  'password',
];

@Component({
  selector: 'app-registration',
  imports: [CommonModule, Volunteer, Organization],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration {
  organisation = false;
  volunteer = false;

  constructor() {
    effect(() => {});
  }

  selectVolunteer() {
    this.volunteer = true;
    this.organisation = false;
  }

  selectOrganisation() {
    this.organisation = true;
    this.volunteer = false;
  }
}
