export interface VolunteerModel {
  volunteerId: string;
  firstName: string;
  lastName: string;
  email: string;

  birthDate?: string;
  citizenship?: string;
  profession?: string;

  profilePhotoUrl?: string;

  description?: string;

  skills?: string;
  interests?: string;
  languages?: string;
}

export interface MatchedVolunteerDetails {
  volunteerEventMatchId: string;
  volunteer: VolunteerModel;
}