import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EventList } from '../home/components/EventList/event-list';
import { ActivatedRoute } from '@angular/router';
import { AiMatchService } from './ai-matched-events.service';
import { Observable } from 'rxjs';
import { MatchedEvents } from './ai-matched-events.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-matched-events',
  imports: [MatIcon, EventList, CommonModule],
  templateUrl: './ai-matched-events.html',
  styleUrl: './ai-matched-events.scss',
})
export class AiMatchedEvents {
  private route = inject(ActivatedRoute);
  private matchService = inject(AiMatchService);
  matchedEvents$!: Observable<MatchedEvents>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id); // ეს არის ორგანიზაციიდან რომ გადმოვა მაშინ ურლ-დან ამოღებული პარამეტრი
    //ეს არის მოხალისსისთვის
    this.matchedEvents$ = this.matchService.getMatches();
  }
}
