import { Component, effect, signal } from '@angular/core';
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

@Component({
  selector: 'app-organization',
  imports: [FormField],
  templateUrl: './organization.html',
  styleUrl: './organization.scss',
})
export class Organization {
  registrationOrganisationModel = signal<RegistrationOrganisationInfo>({
    organisationName: '',
    email: '',
    password: '',
    description: '',
  });

  form = form(this.registrationOrganisationModel, (schema) => {
    required(schema.organisationName, { message: 'გთხოვთ შეავსოთ' });
    required(schema.description, { message: 'გთხოვთ შეავსოთ' });
    required(schema.email, { message: 'გთხოვთ შეავსოთ' });
    email(schema.email, { message: 'გთხოვთ გამოიყენოთ სწორი ფორმატი' });
    required(schema.password, { message: 'გთხოვთ შეავსოთ' });
    minLength(schema.password, 8, { message: 'მინამული სიმბოლოების რაოდენობაა 8' });
    required(schema.description, { message: 'გთხოვთ შეავსოთ' });
  });

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
