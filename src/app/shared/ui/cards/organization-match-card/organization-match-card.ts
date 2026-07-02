import { Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatchedVolunteerDetails, VolunteerModel } from './organization-match-card.model';
import {
  MatchedDetails,
  MatchedEvents,
} from '../../../../ai-matched-events/ai-matched-events.model';
import { EventModel } from '../../../../features/profile/organisation/pages/organization-event/organization-event.model';

@Component({
  selector: 'app-organization-match-card',
  imports: [MatIcon],
  templateUrl: './organization-match-card.html',
  styleUrl: './organization-match-card.scss',
})
export class OrganizationMatchCard {
  volunteerItem = input<EventModel | MatchedDetails | undefined>();

  requestMatch = output<string>();
  rejectMatch = output<string>();

  readonly volunteer = computed<
    | {
        volunteerId: string;
        firstName: string;
        lastName: string;
        email: string;
        dateOfBirth: string;
        citizenship: string;
        profilePhotoUrl: string;
        description: string;
        languages: string;
      }
    | undefined
  >(() => {
    const item = this.volunteerItem();

    if (!item) {
      return undefined;
    }

    if ('volunteer' in item) {
      return item.volunteer;
    }
    return undefined;
  });

  readonly volunteerMatchId = computed(() => {
    const item = this.volunteerItem();

    if (!item) {
      return '';
    }

    if ('volunteer' in item) {
      return item['volunteerEventMatchId'];
    }

    return '';
  });

  readonly fullName = computed(() => {
    const volunteer = this.volunteer();

    return `${volunteer?.firstName ?? ''} ${volunteer?.lastName ?? ''}`.trim();
  });
}
