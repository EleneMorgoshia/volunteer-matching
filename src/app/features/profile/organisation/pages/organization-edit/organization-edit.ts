import { Component, computed, signal } from '@angular/core';
import { email, form, required, FormField } from '@angular/forms/signals';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
interface EditForm {
  image: string;
  name: string;
  email: string;
  linkedIn: string;
  aboutMe: string;
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
    image: '',
    name: '',
    email: '',
    linkedIn: '',
    aboutMe: '',
  });

  readonly editForm = form(this.model, (schemaPath) => {
    required(schemaPath.name, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.email, { message: 'გთხოვთ, შეავსოთ' });
    email(schemaPath.email, { message: 'გთხოვთ, შეავსოთ სწორი ელ.ფოსტის ფორმატით' });

    required(schemaPath.linkedIn, { message: 'გთხოვთ, შეავსოთ' });

    required(schemaPath.aboutMe, { message: 'გთხოვთ, შეავსოთ' });
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
