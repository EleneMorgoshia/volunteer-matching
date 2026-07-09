import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../core/services/shared';
import { EventModel } from '../organization-event/organization-event.model';
import { EventService } from '../organization-event/organization-event.service';

@Component({
  selector: 'app-organization-event-edit',
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    FormField,
    MatIconModule,
    MatButtonModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './organization-event-edit.html',
  styleUrl: './organization-event-edit.scss',
})
export class OrganizationEventEdit implements OnInit {
  formSubmitted = false;

  selectedMainImage = signal<string>('');
  selectedPhoto2Image = signal<string>('');
  selectedPhoto3Image = signal<string>('');
  selectedTagIds = signal<string[]>([]);

  readonly model = signal<EventModel>({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    eventId: '',
    isActive: false,
    organizationName: '',
    shortDescription: '',
    theme: '',
    mainPhotoUrl: '',
    photo2Url: '',
    photo3Url: '',
    description: '',
    requirements: '',
    dailyStartTime: '',
    dailyEndTime: '',
    volunteersAmount: 0,
    benefits: '',
    additionalInfo: '',
    selectedTagIds: [],
    eventTagIds: [],
  });

  readonly editForm = form(this.model, () => {});

  tags$!: Observable<{ tagId: string; name: string }[]>;

  private eventId = '';
  private sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);

  ngOnInit(): void {
    this.tags$ = this.sharedService.getTags();

    this.route.queryParamMap.subscribe((params) => {
      this.eventId = params.get('eventId') || '';

      if (!this.eventId) {
        return;
      }

      this.eventService.getOrganizationEventDetails(this.eventId).subscribe((event) => {
        this.editForm.title().setControlValue(event.title ?? '');
        this.editForm.location().setControlValue(event.location ?? '');
        this.editForm.startDate().setControlValue(event.startDate ?? '');
        this.editForm.endDate().setControlValue(event.endDate ?? '');
        this.editForm.eventId().setControlValue(event.eventId ?? '');
        this.editForm.isActive().setControlValue(event.isActive ?? false);
        this.editForm.organizationName().setControlValue(event.organizationName ?? '');
        this.editForm.shortDescription().setControlValue(event.shortDescription ?? '');
        this.editForm.theme().setControlValue(event.theme ?? '');
        this.editForm.mainPhotoUrl().setControlValue(event.mainPhotoUrl ?? '');
        this.editForm.photo2Url().setControlValue(event.photo2Url ?? '');
        this.editForm.photo3Url().setControlValue(event.photo3Url ?? '');
        this.editForm.description().setControlValue(event.description ?? '');
        this.editForm.requirements().setControlValue(event.requirements ?? '');
        this.editForm.dailyStartTime().setControlValue(event.dailyStartTime ?? '');
        this.editForm.dailyEndTime().setControlValue(event.dailyEndTime ?? '');
        this.editForm.volunteersAmount().setControlValue(event.volunteersAmount ?? 0);
        this.editForm.benefits().setControlValue(event.benefits ?? '');
        this.editForm.additionalInfo().setControlValue(event.additionalInfo ?? '');
        this.selectedTagIds.set(event.selectedTagIds ?? event.eventTagIds);
        this.editForm.selectedTagIds().setControlValue(event.selectedTagIds ?? event.eventTagIds);
      });
    });
  }

  onSubmit(event?: Event): void {
    event?.preventDefault();
    this.formSubmitted = true;

    if (this.editForm().invalid()) {
      return;
    }

    const startDate = new Date(this.editForm().value().startDate).toISOString();
    const endDate = new Date(this.editForm().value().endDate).toISOString();

    const updatedEvent: EventModel = {
      ...this.editForm().value(),
      startDate,
      endDate,
    };

    this.eventService.updateEvent(updatedEvent, this.eventId).subscribe();
  }

  onDeletMainImage() {
    this.selectedMainImage.set('');
    this.editForm.mainPhotoUrl().setControlValue('');
    this.onSubmit();
  }

  onDeleteImage2() {
    this.selectedPhoto2Image.set('');
    this.editForm.photo2Url().setControlValue('');
    this.onSubmit();
  }

  onDeleteImage3() {
    this.selectedPhoto3Image.set('');
    this.editForm.photo3Url().setControlValue('');
    this.onSubmit();
  }

  onPhotoChosen(event: Event, fieldName: 'mainPhotoUrl' | 'photo2Url' | 'photo3Url'): void {
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

        //converted into base64
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

        if (fieldName === 'mainPhotoUrl') {
          this.selectedMainImage.set(compressedBase64);
          this.editForm.mainPhotoUrl().setControlValue(compressedBase64);
        }

        if (fieldName === 'photo2Url') {
          this.selectedPhoto2Image.set(compressedBase64);
          this.editForm.photo2Url().setControlValue(compressedBase64);
        }

        if (fieldName === 'photo3Url') {
          this.selectedPhoto3Image.set(compressedBase64);
          this.editForm.photo3Url().setControlValue(compressedBase64);
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
