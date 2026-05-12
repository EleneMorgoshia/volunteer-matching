import { Component, computed, signal } from '@angular/core';
import { email, form, minLength, required, FormField } from '@angular/forms/signals';
import { MatFormField, MatLabel, MatError, MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface EditForm {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; // ეგ ალბათ დეითზე იქნება გადასაყვანი
  nationality: string;
  linkedIn: string;
  aboutMe: string;
  experience: string;
  technologies: string;
  educatoin: string;
  languages: string;
  skills: string[];
  interests: string[];
  themes: string[];
}

@Component({
  selector: 'app-volunteer-edit',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormField,
    MatError,
    MatOption,
    MatSelect,
    MatIconModule,
  ],
  templateUrl: './volunteer-edit.html',
  styleUrl: './volunteer-edit.scss',
})
export class VolunteerEdit {
  formSubmitted = false;

  readonly model = signal<EditForm>({
    image: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    nationality: '',
    linkedIn: '',
    aboutMe: '',
    experience: '',
    technologies: '',
    educatoin: '',
    languages: '',
    skills: [],
    interests: [],
    themes: [],
  });

  readonly editForm = form(this.model, (schemaPath) => {
    required(schemaPath.firstName, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.lastName, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.email, { message: 'გთხოვთ, შეავსოთ' });
    email(schemaPath.email, { message: 'გთხოვთ, შეავსოთ სწორი ელ.ფოსტის ფორმატით' });

    required(schemaPath.birthDate, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.nationality, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.experience, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.skills, { message: 'გთხოვთ, შეავსოთ' });
    minLength(schemaPath.skills, 1, { message: 'გთხოვთ, აირჩიოთ მინიმუმ 1 მნიშვნელობა' });

    required(schemaPath.interests, { message: 'გთხოვთ, შეავსოთ' });
    minLength(schemaPath.interests, 1, { message: 'გთხოვთ, აირჩიოთ მინიმუმ 1 მნიშვნელობა' });

    required(schemaPath.themes, { message: 'გთხოვთ, შეავსოთ' });
    minLength(schemaPath.themes, 1, { message: 'გთხოვთ, აირჩიოთ მინიმუმ 1 მნიშვნელობა' });
  });

  readonly isFormValid = computed(() => this.editForm().valid());

  onSubmit($event: any) {
    $event.preventDefault();
    this.formSubmitted = true;
    if (!this.isFormValid()) {
      return;
    }
    console.log(this.editForm().value());
  }
}
