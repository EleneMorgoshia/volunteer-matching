import { Component } from '@angular/core';
import { FeedbackCard } from "../feedback-card/feedback-card";
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
      userImg: 'user1.png',
      userName: 'Nicolas Pompeus',
      feedbackComment: 'This platform has completely transformed how our team manages community outreach. The interface is incredibly intuitive, and the support we received during setup was top-notch'
    },
    {
      userImg: 'user2.png',
      userName: 'Sandro Margvelashvili',
      feedbackComment: 'This platform has completely transformed how our team manages community outreach. The interface is incredibly intuitive, and the support we received during setup was top-notch'
    },
    {
      userImg: 'user3.png',
      userName: 'Mariam Nadibaidze',
      feedbackComment: 'This platform has completely transformed how our team manages community outreach. The interface is incredibly intuitive, and the support we received during setup was top-notch'
    },
    {
      userImg: 'user4.png',
      userName: 'Elene Morgoshia',
      feedbackComment: 'This platform has completely transformed how our team manages community outreach. The interface is incredibly intuitive, and the support we received during setup was top-notch'
    }
  ];
}
