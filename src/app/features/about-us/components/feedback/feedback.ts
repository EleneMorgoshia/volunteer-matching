import { Component } from '@angular/core';
import { FeedbackCard } from '../feedback-card/feedback-card';
import { FeedbackCardModel } from '../feedback-card/feedback-card-model';

@Component({
  selector: 'app-feedback',
  imports: [FeedbackCard],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
})
export class Feedback {
  feedbackList: FeedbackCardModel[] = [
    {
      userImg: '/assets/user1.png',
      userName: 'Niko Narimanidze',
      role: 'მოხალისე',
      feedbackComment:
        'AI დამთხვევის დახმარებით სწრაფად ვიპოვე ღონისძიებები, რომლებიც ჩემს ინტერესებსა და უნარებს შეესაბამებოდა.',
    },
    {
      userImg: '/assets/user2.png',
      userName: 'Community Bridge',
      role: 'ორგანიზაცია',
      feedbackComment:
        'პლატფორმამ გაგვიმარტივა შესაბამისი მოხალისეების პოვნა და ღონისძიებებისთვის საჭირო ადამიანების შერჩევა.',
    },
    {
      userImg: '/assets/user3.png',
      userName: 'Mariam Nadibaidze',
      role: 'მოხალისე',
      feedbackComment:
        'როგორც სტუდენტისთვის, პლატფორმა ძალიან სასარგებლოა — მარტივად ვიპოვე გამოცდილების მიღების შესაძლებლობები.',
    },
    {
      userImg: '/assets/user4.png',
      userName: 'Nino Shanidze',
      role: 'მოხალისე',
      feedbackComment:
        'პლატფორმა მოხალისეებსა და ორგანიზაციებს მარტივად აკავშირებს და ორივე მხარეს ახალ შესაძლებლობებს აძლევს.',
    },
  ];
}
