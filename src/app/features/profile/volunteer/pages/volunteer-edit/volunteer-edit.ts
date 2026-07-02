import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable, switchMap, tap } from 'rxjs';
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
  selectedSkillIds: string[];
  selectedInterestIds: string[];
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
  private router = inject(Router);
  private sharedService = inject(SharedService);
  private volunteerProfileService = inject(VolunteerProfileService);

  formSubmitted = false;

  tags$!: Observable<{ tagId: string; name: string }[]>;

  profileOptions$!: Observable<{
    skills: { id: string; name: string }[];
    interests: { id: string; name: string }[];
  }>;

  selectedImage = signal<string>('');

  readonly model = signal<EditForm>({
    firstName: '',
    lastName: '',
    birthDate: '',
    citizenship: '',
    profession: '',
    languages: '',
    education: '',
    profilePhotoUrl: '',
    linkedInUrl: '',
    technologies: '',
    experience: '',
    description: '',
    selectedTagIds: [],
    selectedSkillIds: [],
    selectedInterestIds: [],
  });

  readonly editForm = form(this.model, (schemaPath) => {
    required(schemaPath.firstName, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.lastName, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.birthDate, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.experience, { message: 'გთხოვთ, შეავსოთ' });
  });

  readonly isFormValid = computed(() => this.editForm().valid());

  constructor() {
    effect(() => {
      const currValue = this.volunteerProfileService.profileSignal();

      if (!currValue) {
        return;
      }

      this.editForm().value.set({
        ...currValue,
        selectedSkillIds: currValue.selectedSkillIds ?? [],
        selectedInterestIds: currValue.selectedInterestIds ?? [],
        selectedTagIds: currValue.selectedTagIds ?? [],
      });

      this.selectedImage.set(currValue.profilePhotoUrl ?? '');

      this.tags$ = this.sharedService.getTags().pipe(
        tap((tags) => {
          const currValue = this.volunteerProfileService.profileSignal();

          if (!currValue) {
            return;
          }

          const tagNames = currValue.selectedTagIds || currValue.volunteerTagIds;

          const selectedTagIds = tags
            ?.filter((tag) => tagNames.includes(tag.tagId))
            .map((tag) => tag.tagId);

          console.log(selectedTagIds, tagNames, tags);
          this.editForm.selectedTagIds().setControlValue(selectedTagIds);
        }),
      );

      this.profileOptions$ = this.sharedService.getProfileOptions().pipe(
        tap((options) => {
          const currValue = this.volunteerProfileService.profileSignal();
          if (!currValue) {
            return;
          }
          const skillNames = this.toNameArray((currValue as any).skills);
          const interestNames = this.toNameArray((currValue as any).interests);

          const selectedSkillIds = options.skills
            .filter((skill) => skillNames.includes(skill.name))
            .map((skill) => skill.id);

          const selectedInterestIds = options.interests
            .filter((interest) => interestNames.includes(interest.name))
            .map((interest) => interest.id);

          this.editForm.selectedSkillIds().setControlValue(selectedSkillIds);
          this.editForm.selectedInterestIds().setControlValue(selectedInterestIds);
          console.log(this.editForm.selectedSkillIds());
          console.log(this.editForm.selectedInterestIds());
        }),
      );
    });
  }

  ngOnInit(): void {}

  private toNameArray(value: any): string[] {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === 'string') {
            return item.trim();
          }

          return item.name?.trim();
        })
        .filter(Boolean);
    }

    if (typeof value === 'string') {
      return value.split(',').map((item) => item.trim());
    }

    return [];
  }

  onFileChosen(event: Event) {
    const fileSelect = event.target as HTMLInputElement;

    if (fileSelect.files?.length !== 1) {
      return;
    }

    const file = fileSelect.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        const quality = 0.7;

        const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height);

        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

        this.selectedImage.set(compressedBase64);
        this.editForm.profilePhotoUrl().setControlValue(compressedBase64);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.formSubmitted = true;

    const birthDateValue = this.editForm().value().birthDate;

    if (birthDateValue) {
      const date = new Date(birthDateValue);
      const formattedDate = date.toISOString().split('T')[0];
      this.editForm.birthDate().setControlValue(formattedDate);
    }

    if (!this.isFormValid()) {
      return;
    }

    this.volunteerProfileService
      .updateProfile(this.editForm().value())
      .pipe(
        tap(() => console.log('update finished')),
        switchMap(() => this.volunteerProfileService.getProfileInfo()),
      )
      .subscribe({
        next: (profile) => {
          console.log('profile refreshed', profile);
        },
        error: (err) => {
          console.log('ERROR:', err);
        },
      });
  }

  goToProfile(): void {
    this.router.navigateByUrl('./pages/voluteer-profile/voluteer-profile').then();
  }
}
