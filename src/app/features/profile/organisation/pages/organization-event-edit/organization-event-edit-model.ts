export interface EventEditModel {
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

//თუ ეს მოასწრო ანამ ხო კაი თუ არადა წავშალოთ
export interface SpeakerModel {
  name: string;
  profession: string;
  photoUrl: string;
}
