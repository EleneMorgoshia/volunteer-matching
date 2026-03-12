import { form, FormField } from '@angular/forms/signals';
import { RegistrationVolunteerInfo } from '../../registration.model';
import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volunteer',
  imports: [CommonModule, FormField],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer {
  registrationVolunteerModel = signal<RegistrationVolunteerInfo>({
    name: '',
    lastname: '',
    birthdate: '',
    citizenship: '',
    languages: '',
    profession: '',
    interests: '',
    theme: '',
    email: '',
    password: '',
    skills: '',
  });

  registrationVolunteerForm = form(this.registrationVolunteerModel);

  constructor() {
    effect(() => {
      // console.log(this.registrationVolunteerForm.name().value());
      // console.log(this.registrationVolunteerForm.lastname().value());
      // console.log(this.registrationVolunteerForm.birthdate());
      // console.log(this.registrationVolunteerForm.citizenship());
      // console.log(this.registrationVolunteerForm.languages());
      // console.log(this.registrationVolunteerForm.profession());
      // console.log(this.registrationVolunteerForm.interests());
      // console.log(this.registrationVolunteerForm.theme());
      // console.log(this.registrationVolunteerForm.email());
      // console.log(this.registrationVolunteerForm.password());
    });
  }
}
