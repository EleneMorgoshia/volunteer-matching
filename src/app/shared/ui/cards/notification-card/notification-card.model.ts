export interface OrganizationNotificationModel {
  volunteerEventMatchId: string;
  organizationId: string;
  organizationName: string;
  message: string;
  status: number;
  requestedByRole: string;
  createdAt: string;
  event: NotificationEventModel;
}

export interface NotificationEventModel {
  eventId: string;
  title: string;
  organizationName: string;
  shortDescription: string;
  location: string;
  startDate: string;
  endDate: string;
  theme: string;
  mainPhotoUrl: string;
}