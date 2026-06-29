import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { EventParams } from './organization-event.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { EventService } from './organization-event.service';
import { form, FormField } from '@angular/forms/signals';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../core/services/shared';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarLabel } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/overlay';
@Component({
  selector: 'app-organization-event',
  imports: [
    MatIcon,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    FormField,
    CommonModule,
  ],
  templateUrl: './organization-event.html',
  styleUrl: './organization-event.scss',
})
export class OrganizationEvent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);
  editMode = false;

  readonly messageText = signal<string>('');

  //ფოტოებისთვის დავამატე ეს სიგნალები
  selectedMainImage = signal<string>('');
  selectedPhoto2Image = signal<string>('');
  selectedPhoto3Image = signal<string>('');

  eventModel = signal<EventParams>({
    title: '',
    description: '',
    requirements: '',
    location: '',
    startDate: '',
    endDate: '',
    dailyStartTime: '', //hh:mm:ss
    dailyEndTime: '', //hh:mm:ss
    volunteersAmount: 0,
    benefits: '',
    mainPhotoUrl: '',
    photo2Url: '',
    photo3Url: '',
    additionalInfo: '',
    selectedTagIds: [],
  });

  form = form(this.eventModel, (schema) => {
    // required(schema.interests, { message: 'გთხოვთ შეავსოთ' });
    // required(schema.selectedTagIds, { message: 'გთხოვთ შეავსოთ' });
  });

  tags$!: Observable<{ tagId: string; name: string }[]>;
  submitted = false;
  private sharedService = inject(SharedService);

  onSend() {
    console.log('VOLUNTEER SEND CLICKED');
    this.submitted = true;

    console.log('Form value:', this.form().value());

    if (this.form().invalid()) {
      return;
    }

    const startDate = new Date(this.form().value().startDate).toISOString();
    const endDate = new Date(this.form().value().endDate).toISOString();

    this.eventService
      .createEvent({ ...this.form().value(), startDate, endDate })
      .subscribe((res) => {
        // this.messageText.set(res?.messageContent);
        this.snackBar.open(res?.messageContent, 'დახურვა', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  ngOnInit() {
    // queryParamMap returns an observable map of parameters
    // ეს ედითში გადავაგდოთ
    this.route.queryParamMap.subscribe((params) => {
      this.editMode = !!params.get('eventId');
    });
    this.tags$ = this.sharedService.getTags();
  }

  onPhotoChosen(event: Event, fieldName: 'mainPhotoUrl' | 'photo2Url' | 'photo3Url') {
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

        if (fieldName === 'mainPhotoUrl') {
          this.selectedMainImage.set(compressedBase64);
          this.form.mainPhotoUrl().setControlValue(compressedBase64);
        }

        if (fieldName === 'photo2Url') {
          this.selectedPhoto2Image.set(compressedBase64);
          this.form.photo2Url().setControlValue(compressedBase64);
        }

        if (fieldName === 'photo3Url') {
          this.selectedPhoto3Image.set(compressedBase64);
          this.form.photo3Url().setControlValue(compressedBase64);
        }
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  goToProfile(): void {
    this.router.navigateByUrl('/organization/profile').then();
  }
}
