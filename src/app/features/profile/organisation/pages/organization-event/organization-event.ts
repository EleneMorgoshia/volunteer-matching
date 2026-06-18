import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { EventParams } from './organization-event.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { EventService } from './organization-event.service';
import { form } from '@angular/forms/signals';
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
  ],
  templateUrl: './organization-event.html',
  styleUrl: './organization-event.scss',
})
export class OrganizationEvent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  editMode = false;

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

  submitted = false;

  onSend() {
    console.log('VOLUNTEER SEND CLICKED');
    this.submitted = true;

    console.log('Form value:', this.form().value());

    if (this.form().invalid()) {
      return;
    }

    this.eventService.createEvent(this.form().value());
  }

  ngOnInit() {
    // queryParamMap returns an observable map of parameters
    // ეს ედითში გადავაგდოთ
    this.route.queryParamMap.subscribe((params) => {
      this.editMode = !!params.get('eventId');
    });
  }
}
