import { Component, input } from '@angular/core';
// import { EventModel } from '../../../../models/event.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrganizationNotificationModel } from './notification-card.model';

@Component({
  selector: 'app-notification-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.scss',
})
export class NotificationCard {
  // eventDetails = input<Partial<EventModel>>();
  //ამის მოდელის აღწერა ჩამიგდო ანამ და მაგიტომ შევცვალე და მაგ txtსაც განახებ,
  //ზემოთა მაგიტომ დავაკომნეტარე რო რამე შევცვალოთ
  notification = input<OrganizationNotificationModel>();

  //სატეტსტოდ:
   testNotification: OrganizationNotificationModel = {
    volunteerEventMatchId: 'a478d1cf-0a59-f111-8454-c0b5d79c0c94',
    organizationId: 'org-test-id',
    organizationName: 'მზრუნველი ხელები',
    message:
      'ლუკა კაპანაძე-მა გამოგიგზავნათ დამეჩვის მოთხოვნა "საგანმანათლებლო შეხვედრის ორგანიზაციული მხარდაჭერა" ღონისძიებაზე.',
    status: 3,
    requestedByRole: 'მოხალისე',
    createdAt: '2026-05-26T17:57:20.6352676+04:00',
    event: {
      eventId: '08c32464-ba57-f111-8454-c0b5d79c0c94',
      title: 'საგანმანათლებლო შეხვედრის ორგანიზაციული მხარდაჭერა',
      organizationName: 'მზრუნველი ხელები',
      shortDescription:
        'ღონისძიება მოიცავს მოსწავლეებისა და სტუდენტებისთვის საინფორმაციო შეხვედრას სწავლის შესაძლებლობებზე. მოხალისეები დაეხმარებიან ორგანიზაციულ ნაწილს.',
      location: 'თბილისი, საგანმანათლებლო ცენტრი',
      startDate: '2026-06-18T12:00:00+00:00',
      endDate: '2026-06-18T16:00:00+00:00',
      theme: 'განათლება',
      mainPhotoUrl: 'https://example.com/images/education-meeting-main.jpg',
    },
  };
}
