import { Component, Input } from '@angular/core';
import { FeedbackCardModel } from './feedback-card-model';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-feedback-card',
  imports: [],
  templateUrl: './feedback-card.html',
  styleUrl: './feedback-card.scss',
})
export class FeedbackCard {
  @Input() data!: FeedbackCardModel;
}
