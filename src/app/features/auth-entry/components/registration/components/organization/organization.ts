import { Component, effect, inject, signal } from '@angular/core';
import { RegistrationOrganisationInfo } from '../../registration.model';
import {
  email,
  FieldState,
  FieldTree,
  form,
  FormField,
  minLength,
  required,
} from '@angular/forms/signals';
import { RegistrationService } from '../../registration.service';
import { AuthService } from '../../../../../../core/auth/auth.service';

@Component({
  selector: 'app-organization',
  imports: [FormField],
  templateUrl: './organization.html',
  styleUrl: './organization.scss',
})
export class Organization {
  registrationOrganisationModel = signal<RegistrationOrganisationInfo>({
    organizationName: '',
    email: '',
    password: '',
    description: '',
    confirmPassword: '',
  });

  form = form(this.registrationOrganisationModel, (schema) => {
    required(schema.organizationName, { message: 'გთხოვთ შეავსოთ' });
    required(schema.description, { message: 'გთხოვთ შეავსოთ' });
    required(schema.email, { message: 'გთხოვთ შეავსოთ' });
    email(schema.email, { message: 'გთხოვთ გამოიყენოთ სწორი ფორმატი' });
    required(schema.password, { message: 'გთხოვთ შეავსოთ' });
    minLength(schema.password, 8, { message: 'მინამული სიმბოლოების რაოდენობაა 8' });
    required(schema.confirmPassword, { message: 'გთხოვთ შეავსოთ' });
    minLength(schema.confirmPassword, 8, { message: 'მინამული სიმბოლოების რაოდენობაა 8' });
    required(schema.description, { message: 'გთხოვთ შეავსოთ' });
  });

  private registrationService = inject(RegistrationService);
  private authService = inject(AuthService);

  submitted = false;

  constructor() {
    effect(() => {
      // console.log(this.form().value());
    });
  }

  onSend() {
    this.submitted = true;
    console.log(this.form().invalid());
    if (this.form().invalid()) {
      return;
    }
    const values = this.form().value();
    console.log('გასაგზავნი მნიშვნელობები: ', values);
    // this.registrationService.registerOrganisation(values).subscribe();

    this.registrationService
      .registerOrganisation(values)
      .subscribe((res) => this.authService.navigateToCorrectProfile());
  }

  isValid(formField: FieldTree<string, any>) {
    return !this.submitted && !formField().valid();
  }

  getErrors(formField: FieldTree<string, any>) {
    return formField()
      .errors()
      .map((er) => er.message)
      .join('<br>');
  }
}
