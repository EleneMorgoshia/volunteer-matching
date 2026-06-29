import { Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatchedVolunteerDetails,
  VolunteerModel,
} from './organization-match-card.model';

@Component({
  selector: 'app-organization-match-card',
  imports: [MatIcon],
  templateUrl: './organization-match-card.html',
  styleUrl: './organization-match-card.scss',
})
export class OrganizationMatchCard {
  volunteerItem = input<VolunteerModel | MatchedVolunteerDetails>();

  requestMatch = output<string>();
  rejectMatch = output<string>();

  readonly volunteer = computed<VolunteerModel | undefined>(() => {
    const item = this.volunteerItem();

    if (!item) {
      return undefined;
    }

    if ('volunteer' in item) {
      return item.volunteer;
    }

    return item;
  });

  readonly volunteerMatchId = computed(() => {
    const item = this.volunteerItem();

    if (!item) {
      return '';
    }

    if ('volunteer' in item) {
      return item.volunteerEventMatchId;
    }

    return '';
  });

  readonly fullName = computed(() => {
    const volunteer = this.volunteer();

    return `${volunteer?.firstName ?? ''} ${volunteer?.lastName ?? ''}`.trim();
  });
}