import { email, FieldTree, form, FormField, minLength, required } from '@angular/forms/signals';
import { RegistrationVolunteerInfo } from '../../registration.model';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../registration.service';
import { MatFormField, MatLabel, MatOption, MatError, MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../../core/services/shared';
import { AuthService } from '../../../../../../core/auth/auth.service';

@Component({
  selector: 'app-volunteer',
  imports: [CommonModule, FormField, MatFormField, MatLabel, MatOption, MatError, MatSelect],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer implements OnInit {
  birthDateString = signal('');

  registrationVolunteerModel = signal<RegistrationVolunteerInfo>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    citizenship: '',
    profession: '',
    languages: '',
    selectedSkillIds: [],
    selectedInterestIds: [],
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
    required(schema.selectedSkillIds, { message: 'გთხოვთ შეავსოთ' });
    required(schema.selectedInterestIds, { message: 'გთხოვთ შეავსოთ' });
    required(schema.selectedTagIds, { message: 'გთხოვთ შეავსოთ' });
  });

  //თემარიკისთვის
  onTagChange(event: any) {
    console.log(event, this.form.selectedTagIds().value());
  }

  //შემოვაინჯექთე სერვიცი
  private registrationService = inject(RegistrationService);
  private sharedService = inject(SharedService);
  private authService = inject(AuthService);
  submitted = false;
  tags$!: Observable<{ tagId: string; name: string }[]>;
  profileOptions$!: Observable<{
    skills: { id: string; name: string }[];
    interests: { id: string; name: string }[];
  }>;

  constructor() {
    effect(() => {
      // console.log(this.form().value());
    });
  }

  ngOnInit(): void {
    this.tags$ = this.sharedService.getTags();
    this.profileOptions$ = this.sharedService.getProfileOptions();
  }

  onSend() {
    console.log('VOLUNTEER SEND CLICKED');
    this.submitted = true;

    console.log('Form invalid:', this.form().invalid());
    console.log('Form value:', this.form().value());

    if (this.form().invalid()) {
      return;
    }

    if (!this.birthDateString()) {
      console.log('Birth date is empty');
      return;
    }

    const date = new Date(this.birthDateString());
    const formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate); // 2026-06-09

    const values: RegistrationVolunteerInfo = {
      email: this.form.email().value(),
      password: this.form.password().value(),
      confirmPassword: this.form.confirmPassword().value(),
      firstName: this.form.firstName().value(),
      lastName: this.form.lastName().value(),

      //აი აქ აქვს პრობლმეა ანუ სტინგადაც გავუშვი და მაინც არ მუშაობს. არ ვიცი რა უნდა. პოსტზე არი ერორი
      //ვერ იგზავნება რექვესთი.....
      birthDate: date.toISOString().split('T')[0],
      citizenship: this.form.citizenship().value(),
      profession: this.form.profession().value(),
      languages: this.form.languages().value(),
      selectedSkillIds: this.form.selectedSkillIds().value(),
      selectedInterestIds: this.form.selectedInterestIds().value(),
      selectedTagIds: this.form.selectedTagIds().value(),
    };

    console.log('გასაგზავნი მნიშვნელობები: ', values);

    this.registrationService
      .registerVolunteer(values)
      .subscribe((res) => this.authService.navigateToCorrectProfile());
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
