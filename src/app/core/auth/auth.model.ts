export const ROLE = {
  ORGANIZATION: 'ორგანიზაცია',
  VOLUNTEER: 'მოხალისე',
};

export interface loginModelParams {
  email: string;
  password: string;
}

export interface loginModelResponse {
  accessToken: string;
  userId: string;
  role: string;
  refreshToken: string;
  message: string;
}
