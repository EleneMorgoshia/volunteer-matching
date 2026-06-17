import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { EventParams } from './organization-event.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
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
  editMode = false;

  readonly model = signal<EventParams>({
    title: '',
    description: '',
    requirements: '',
    location: '',
    startDate: '',
    endDate: '',
    dailyStartTime: '',
    dailyEndTime: '',
    volunteersAmount: 0,
    benefits: '',
    mainPhotoUrl: '',
    photo2Url: '',
    photo3Url: '',
    additionalInfo: '',
    selectedTagIds: [],
  });

  ngOnInit() {
    // queryParamMap returns an observable map of parameters
    this.route.queryParamMap.subscribe((params) => {
      this.editMode = !!params.get('eventId');
    });
  }
}
