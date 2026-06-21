import { Component, computed, effect, inject, signal } from '@angular/core';
import { email, form, required, FormField } from '@angular/forms/signals';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { OrganizationProfileService } from '../organization-profile/organization-profile.service';
import { HeaderService } from '../../../../../shared/ui/header/header-service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
interface EditForm {
  organizationName: string;
  description: string;
  profilePhotoUrl: string;
  linkedInUrl: string;
}
@Component({
  selector: 'app-organization-edit',
  imports: [MatFormField, MatLabel, MatInput, FormField, MatError, MatIconModule],
  templateUrl: './organization-edit.html',
  styleUrl: './organization-edit.scss',
})
export class OrganizationEdit {
  formSubmitted = false;
  readonly model = signal<EditForm>({
    organizationName: '',
    description: '',
    profilePhotoUrl: '',
    linkedInUrl: '',
  });

  //ეს იმიტორო პროფაილზე დაბრუნება შეძლოს
  private router = inject(Router);

  readonly editForm = form(this.model, (schemaPath) => {
    required(schemaPath.organizationName, { message: 'გთხოვთ, შეავსოთ' });

    // required(schemaPath.email, { message: 'გთხოვთ, შეავსოთ' });
    // email(schemaPath.email, { message: 'გთხოვთ, შეავსოთ სწორი ელ.ფოსტის ფორმატით' });

    required(schemaPath.linkedInUrl, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.description, { message: 'გთხოვთ, შეავსოთ' });
  });

  readonly isFormValid = computed(() => this.editForm().valid());

  private service = inject(OrganizationProfileService);

  selectedImage = signal<string>('');

  constructor() {
    effect(() => {
      const currValue = this.service.profileSignal() ?? {
        organizationName: '',
        description: '',
        profilePhotoUrl: '',
        linkedInUrl: '',
      };
      this.editForm().value.set({ ...currValue });
    });
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
    if (!this.isFormValid()) {
      return;
    }
    this.service
      .updateProfile(this.editForm().value())
      .pipe(switchMap((res) => this.service.getProfileInfo()))
      .subscribe();
  }



  goToProfile(): void {
    this.router.navigateByUrl('/organization/profile').then();
  }
}
