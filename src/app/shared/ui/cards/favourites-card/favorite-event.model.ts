//ბექნედი რასაც მიბრუნებს
export interface FavoriteEventsResponse {
  items: FavoriteEventModel[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface FavoriteEventModel {
  isFavorite: boolean;
  eventId: string;
  title: string;
  organizationName: string;
  shortDescription: string;
  location: string;
  startDate: string;
  endDate: string;
  theme: string | null;
  mainPhotoUrl: string | null;
}