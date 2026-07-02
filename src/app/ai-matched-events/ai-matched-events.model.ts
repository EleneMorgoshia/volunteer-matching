import { EventModel } from '../models/event.model';

export interface MatchedEvents {
  [x: string]: any;
  items: MatchedDetails[];
  page: 1;
  pageSize: 6;
  totalCount: 1;
  totalPages: 1;
}

export interface MatchedDetails {
  volunteerEventMatchId: string;
  isFavorite: boolean;
  event: Partial<EventModel>;
  volunteer?: {
    volunteerId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    citizenship: string;
    profilePhotoUrl: string;
    description: string;
    languages: string;
  };
}
