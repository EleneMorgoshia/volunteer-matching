import { email, FieldTree, form, FormField, minLength, required } from '@angular/forms/signals';
import { RegistrationVolunteerInfo } from '../../registration.model';
import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'app-volunteer',
  imports: [CommonModule, FormField],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer {
  birthDateString = signal('');

  registrationVolunteerModel = signal<RegistrationVolunteerInfo>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthDate: {
      year: 0,
      month: 0,
      day: 0,
      dayOfWeek: 0,
    },
    citizenship: '',
    profession: '',
    languages: '',
    skills: '',
    interests: '',
    selectedTagIds: [],
  });

  // registrationVolunteerForm = form(this.registrationVolunteerModel);
  form = form(this.registrationVolunteerModel, (schema) => {
    required(schema.firstName, { message: 'გთხოვთ შეავსოთ' });
    required(schema.lastName, { message: 'გთხოვთ შეავსოთ' });

    required(schema.email, { message: 'გთხოვთ შეავსოთ' });
    email(schema.email, { message: 'გთხოვთ გამოიყენოთ სწორი ფორმატი' });

    required(schema.password, { message: 'გთხოვთ შეავსოთ' });
    minLength(schema.password, 8, { message: 'მინიმალური სიმბოლოების რაოდენობაა 8' });

    required(schema.confirmPassword, { message: 'გთხოვთ შეავსოთ' });
    minLength(schema.confirmPassword, 8, {
      message: 'მინიმალური სიმბოლოების რაოდენობაა 8',
    });

    required(schema.citizenship, { message: 'გთხოვთ შეავსოთ' });
    required(schema.profession, { message: 'გთხოვთ შეავსოთ' });
    required(schema.languages, { message: 'გთხოვთ შეავსოთ' });
    required(schema.skills, { message: 'გთხოვთ შეავსოთ' });
    required(schema.interests, { message: 'გთხოვთ შეავსოთ' });
  });

  //თემარიკისთვის
  onTagChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const currentValue = this.registrationVolunteerModel().selectedTagIds;

    if (input.checked) {
      this.registrationVolunteerModel.update((model) => ({
        ...model,
        selectedTagIds: [...currentValue, input.value],
      }));
    } else {
      this.registrationVolunteerModel.update((model) => ({
        ...model,
        selectedTagIds: currentValue.filter((id) => id !== input.value),
      }));
    }
  }

  //შემოვაინჯექთე სერვიცი
  private registrationService = inject(RegistrationService);
  submitted = false;

  constructor() {
    effect(() => {
      // console.log(this.form().value());
    });
  }

  onSend() {
    console.log('VOLUNTEER SEND CLICKED');
    this.submitted = true;

    console.log('Form invalid:', this.form().invalid());
    console.log('Form value:', this.form().value());

    if (this.form().invalid()) {
      console.log('email errors:', this.form.email().errors());
      console.log('password errors:', this.form.password().errors());
      console.log('confirmPassword errors:', this.form.confirmPassword().errors());
      console.log('firstName errors:', this.form.firstName().errors());
      console.log('lastName errors:', this.form.lastName().errors());
      console.log('citizenship errors:', this.form.citizenship().errors());
      console.log('profession errors:', this.form.profession().errors());
      console.log('languages errors:', this.form.languages().errors());
      console.log('skills errors:', this.form.skills().errors());
      console.log('interests errors:', this.form.interests().errors());
      return;
    }

    if (!this.birthDateString()) {
      console.log('Birth date is empty');
      return;
    }

    const date = new Date(this.birthDateString());

    const values: RegistrationVolunteerInfo = {
      email: this.form.email().value(),
      password: this.form.password().value(),
      confirmPassword: this.form.confirmPassword().value(),
      firstName: this.form.firstName().value(),
      lastName: this.form.lastName().value(),

      //აი აქ აქვს პრობლმეა ანუ სტინგადაც გავუშვი და მაინც არ მუშაობს. არ ვიცი რა უნდა. პოსტზე არი ერორი
      //ვერ იგზავნება რექვესთი.....
      birthDate: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        dayOfWeek: date.getDay(),
      },

      citizenship: this.form.citizenship().value(),
      profession: this.form.profession().value(),
      languages: this.form.languages().value(),
      skills: this.form.skills().value(),
      interests: this.form.interests().value(),

      selectedTagIds: this.registrationVolunteerModel().selectedTagIds,
    };

    console.log('გასაგზავნი მნიშვნელობები: ', values);

    this.registrationService.registerVolunteer(values).subscribe({
      next: (resp) => {
        console.log('Volunteer registration success:', resp);
      },
      error: (err) => {
        console.log('Volunteer registration error:', err);
        console.log('Backend error body:', err.error);
      },
    });
  }

  isValid(formField: FieldTree<string, any>) {
    return this.submitted && !formField().valid();
  }

  getErrors(formField: FieldTree<string, any>) {
    return formField()
      .errors()
      .map((er) => er.message)
      .join('<br>');
  }
}
