import { Component, inject, OnInit, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { EventEditModel } from './organization-event-edit-model';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../core/services/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../organization-event/organization-event.service';
import { EventModel } from '../organization-event/organization-event.model';

@Component({
  selector: 'app-organization-event-edit',
  imports: [MatFormField, MatLabel, MatError, MatInput, FormField, MatIconModule, MatButtonModule],
  templateUrl: './organization-event-edit.html',
  styleUrl: './organization-event-edit.scss',
})
export class OrganizationEventEdit implements OnInit {
  formSubmitted = false;

  readonly model = signal<EventEditModel>({
    title: 'Random Event Name',
    shortDescription: 'მოკლე აღწერა',
    description: 'სრული აღწერა',
    location: 'Fabrika Tbilisi',
    startDate: '2026-02-24T16:00',
    endDate: '2026-02-24T18:00',
    theme: 'ტექნოლოგიები',
    mainPhotoUrl: '',
    photo2Url: '',
    photo3Url: '',
    requirements: ['გუნდური მუშაობის უნარი', 'კომუნიკაციის უნარი'],
    speakers: [
      {
        name: 'ელენე მორგოშია',
        profession: 'დეველოპერი',
        photoUrl: '',
      },
    ],
  });

  tags$!: Observable<{ tagId: string; name: string }[]>;
  submitted = false;
  eventDetails$!: Observable<EventModel>;
  private eventId = '';
  private sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);

  readonly editForm = form(this.model, (schemaPath) => {
    required(schemaPath.title, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.shortDescription, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.description, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.location, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.startDate, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.endDate, { message: 'გთხოვთ, შეავსოთ' });
    required(schemaPath.theme, { message: 'გთხოვთ, შეავსოთ' });
  });

  onSubmit(event: Event) {
    this.formSubmitted = true;
  }

  selectedImage = signal<string>('');

  onFileChosen(event: Event) {
    // file logic
  }

  ngOnInit() {
    // queryParamMap returns an observable map of parameters
    // ეს ედითში გადავაგდოთ
    this.route.queryParamMap.subscribe((params) => {
      this.eventId = params.get('eventId') || '';
      this.eventDetails$ = this.eventService.getOrganizationEventDetails(this.eventId);
    });
    this.tags$ = this.sharedService.getTags();
  }
}
