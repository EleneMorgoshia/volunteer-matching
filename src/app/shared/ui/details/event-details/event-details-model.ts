//ეს შეიძლება ვაფშე წაიშალოს. ანამ თუ მოხოდა დავტოვოთ, თუ არადა წაიშალოს
export interface EventSpeakerModel {
  fullName: string;
  profession: string;
  imageUrl?: string;
}

export interface EventDetailModel {
  title: string;
  organizationName: string;
  organizationEmail: string;
  organizationLogoUrl?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  speakers: EventSpeakerModel[];
  location: string;
  startDate: string;
  endDate: string;
  theme: string;
  additionalInfo: string;
  eventId: string;
  email: string;
  volunteersAmount: number;
  acceptedVolunteersCount: number;
  isFilled: boolean;
  dailyStartTime: string;
  dailyEndTime: string;
  mainPhotoUrl: string;
  photo1Url: string;
  photo2Url: string;
  eventTagIds: string[];
}
