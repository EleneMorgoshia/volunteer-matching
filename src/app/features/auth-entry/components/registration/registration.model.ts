export interface RegistrationVolunteerInfo {
  //აქ ეს კი დააბდეითდა მარგამ selectedTagIds-ში ეს სტრინგი რა არის?
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  birthDate: {
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
  };
  citizenship: string;
  profession: string;
  languages: string;
  skills: string;
  interests: string;
  selectedTagIds: string[];
}

export interface RegistrationOrganisationInfo {
  email: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  description: string;
}

export interface RegisterModelResponse {
  accessToken: string;
  userId: string;
  role: string;
  message: string;
}
