export interface VolunteerModel {
  firstName: string;
  lastName: string;

  //აქ ჩავამატე იმელი
  email: string;
  birthDate: string;

  citizenship: string;
  profession: string;
  languages: string;
  selectedSkillIds: string[];
  selectedInterestIds: string[];
  skills: string;
  interests: string;

  education: string;
  profilePhotoUrl: string;
  linkedInUrl: string;
  technologies: string;
  experience: string;
  description: string;

  selectedTagIds: string[];
}

export interface UpdateProfileParams {
  firstName: string;
  lastName: string;
  birthDate: string;
  citizenship: string;
  profession: string;
  languages: string;
  selectedSkillIds: string[];
  selectedInterestIds: string[];
  education: string;
  profilePhotoUrl: string;
  linkedInUrl: string;
  technologies: string;
  experience: string;
  description: string;
  selectedTagIds: string[];
}
