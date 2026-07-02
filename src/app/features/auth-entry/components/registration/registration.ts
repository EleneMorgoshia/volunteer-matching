import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RegistrationOrganisationInfo, RegistrationVolunteerInfo } from './registration.model';
import { form, FormField } from '@angular/forms/signals';
import { Volunteer } from './components/volunteer/volunteer';
import { Organization } from './components/organization/organization';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ActivatedRoute } from '@angular/router';

export const fields: (keyof RegistrationVolunteerInfo)[] = [
  'firstName',
  'lastName',
  'birthDate',
  'citizenship',
  'languages',
  'profession',
  'selectedInterestIds',
  'selectedSkillIds',
  'password',
  'confirmPassword',
  'email',
  'selectedTagIds',
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
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const role = params['role'];

      this.volunteer = role === 'volunteer';
      this.organisation = role === 'organization';
    });
  }
}
