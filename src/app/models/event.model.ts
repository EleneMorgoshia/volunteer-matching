export interface EventModel {
  eventPhoto: string;
  eventTitle: string;
  organizationName: string;
  eventDateTime: Date; // დაწყების თარიღია?
  eventLastingPeriod: Date; // დასრულების თარიღია?
  eventDescription: string;
  // status ეს ივენთი დამეჩილია თუ არა ?????
  status: boolean;
  eventLocation: string;
}
