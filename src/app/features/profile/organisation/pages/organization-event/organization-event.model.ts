export interface EventParams {
  title: string;
  description: string;
  requirements: string;
  location: string;
  startDate: string;
  endDate: string;
  dailyStartTime: {
    hour: 0;
    minute: 0;
  };
  dailyEndTime: {
    hour: 0;
    minute: 0;
  };
  volunteersAmount: 2147483647;
  benefits: string;
  mainPhotoUrl: string;
  photo2Url: string;
  photo3Url: string;
  additionalInfo: string;
  selectedTagIds: string[];
}
