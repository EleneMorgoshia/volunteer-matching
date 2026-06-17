export interface EventEditModel {
  title: string;
  shortDescription: string;
  description: string;

  location: string;

  startDate: string;
  endDate: string;

  theme: string;

  mainPhotoUrl: string;

  photo2Url: string;
  photo3Url: string;

  requirements: string[];

  speakers: SpeakerModel[];
}

//თუ ეს მოასწრო ანამ ხო კაი თუ არადა წავშალოთ 
export interface SpeakerModel {
  name: string;
  profession: string;
  photoUrl: string;
}