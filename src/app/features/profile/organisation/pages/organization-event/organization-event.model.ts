export interface EventParams {
  title: string;
  description: string;
  requirements: string;
  location: string;
  startDate: string;
  endDate: string;
  dailyStartTime: string; //hh:mm:ss
  dailyEndTime: string; //hh:mm:ss
  volunteersAmount: number;
  benefits: string;
  mainPhotoUrl: string;
  photo2Url: string;
  photo3Url: string;
  additionalInfo: string;
  selectedTagIds: string[];
}
