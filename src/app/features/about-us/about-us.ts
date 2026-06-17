import { Component } from '@angular/core';
import { AboutHero } from "./components/about-hero/about-hero";
import { HowItWorks } from "./components/how-it-works/how-it-works";
import { Creators } from "./components/creators/creators";
import { Feedback } from "./components/feedback/feedback";
import {FAQ} from "./components/faq/faq";

@Component({
  selector: 'app-about-us',
  standalone:true,
  imports: [AboutHero, HowItWorks, Creators, Feedback,FAQ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {

}
