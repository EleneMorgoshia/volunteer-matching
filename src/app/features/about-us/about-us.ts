import { Component } from '@angular/core';
import { AboutHero } from "./components/about-hero/about-hero";
import { OurStory } from "./components/our-story/our-story";
import { HowItWorks } from "./components/how-it-works/how-it-works";
import { Creators } from "./components/creators/creators";
import { Feedback } from "./components/feedback/feedback";

@Component({
  selector: 'app-about-us',
  standalone:true,
  imports: [AboutHero, OurStory, HowItWorks, Creators, Feedback],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {

}
