export interface EventMatchResponse {
  incoming: MatchItems;
  accepted: MatchItems;
}

export interface MatchItems {
  items: Item[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface Item {
  volunteerEventMatchId: string;
  volunteerId: string;
  volunteerFullName: string;
  organizationId: string;
  organizationName: string;
  message: string;
  status: number;
  requestedByRole: string;
  createdAt: string;
  event: Event;
}

export interface Event {
  eventId: string;
  title: string;
  organizationName: string;
  shortDescription: string;
  location: string;
  startDate: string;
  endDate: string;
  theme: string;
  mainPhotoUrl: string;
}
