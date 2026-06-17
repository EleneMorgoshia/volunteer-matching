import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { email, form, minLength, required, FormField } from '@angular/forms/signals';
import { MatFormField, MatLabel, MatError, MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../core/services/shared';
import { CommonModule } from '@angular/common';
import { VolunteerProfileService } from '../voluteer-profile/volunteer-profile.service';
import { Router } from '@angular/router';

interface EditForm {
  firstName: string;
  lastName: string;
  birthDate: string;
  citizenship: string;
  profession: string;
  languages: string;
  skills: string;
  interests: string;
  education: string;
  profilePhotoUrl: string;
  linkedInUrl: string;
  technologies: string;
  experience: string;
  description: string;
  selectedTagIds: string[];
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
    CommonModule,
  ],
  templateUrl: './volunteer-edit.html',
  styleUrl: './volunteer-edit.scss',
})
export class VolunteerEdit implements OnInit {
  //ეს 48 ლაინი დავამატე იმიტორო რო გადაიყვანოს პროფილის გვერდზე თუ აღარ მოუნდა ედიტი
  private router = inject(Router);
  formSubmitted = false;
  tags$!: Observable<{ tagId: string; name: string }[]>;
  readonly isFormValid = computed(() => this.editForm().valid());
  private sharedService = inject(SharedService);
  private volunteerProfileService = inject(VolunteerProfileService);

  selectedImage = signal<string>('');

  readonly model = signal<EditForm>({
    firstName: '',
    lastName: '',
    birthDate: '',
    citizenship: '',
    profession: '',
    languages: '',
    skills: '',
    interests: '',
    education: '',
    profilePhotoUrl: '',
    linkedInUrl: '',
    technologies: '',
    experience: '',
    description: '',
    selectedTagIds: [],
  });

  readonly editForm = form(this.model, (schemaPath) => {
    required(schemaPath.firstName, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.lastName, { message: 'გთხოვთ, შეავსოთ' });

    // required(schemaPath.email, { message: 'გთხოვთ, შეავსოთ' });
    // email(schemaPath.email, { message: 'გთხოვთ, შეავსოთ სწორი ელ.ფოსტის ფორმატით' });

    required(schemaPath.birthDate, { message: 'გთხოვთ, შეავსოთ' });

    // required(schemaPath.nationality, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.experience, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.skills, { message: 'გთხოვთ, შეავსოთ' });
    minLength(schemaPath.skills, 1, { message: 'გთხოვთ, აირჩიოთ მინიმუმ 1 მნიშვნელობა' });

    required(schemaPath.interests, { message: 'გთხოვთ, შეავსოთ' });
    minLength(schemaPath.interests, 1, { message: 'გთხოვთ, აირჩიოთ მინიმუმ 1 მნიშვნელობა' });

    //   required(schemaPath.themes, { message: 'გთხოვთ, შეავსოთ' });
    //   minLength(schemaPath.themes, 1, { message: 'გთხოვთ, აირჩიოთ მინიმუმ 1 მნიშვნელობა' });
  });

  ngOnInit(): void {
    this.tags$ = this.sharedService.getTags();
  }

  onFileChosen(event: Event) {
    const fileSelect = event.target as HTMLInputElement;

    if (fileSelect.files?.length === 1) {
      const img = fileSelect.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result as string;
        this.selectedImage.set(content);
        this.editForm.profilePhotoUrl().setControlValue(content);
      };

      reader.readAsDataURL(img);
    }
  }

  onSubmit($event: any) {
    $event.preventDefault();
    this.formSubmitted = true;
    const date = new Date(this.editForm().value().birthDate);
    const formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate); // 2026-06-09
    this.editForm.birthDate().setControlValue(formattedDate);
    if (!this.isFormValid()) {
      return;
    }
    console.log(this.editForm().value());
    this.volunteerProfileService.updateProfile(this.editForm().value()).subscribe();
  }

  goToProfile(): void {
    this.router.navigateByUrl('./pages/voluteer-profile/voluteer-profile').then();
  }
}
