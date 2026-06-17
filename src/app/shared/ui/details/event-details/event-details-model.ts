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

  mainPhotoUrl?: string;
  galleryPhotoUrls?: string[];
}