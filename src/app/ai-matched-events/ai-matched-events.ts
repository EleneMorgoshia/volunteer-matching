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
  readonly matchService = inject(AiMatchService);
  matchedEvents$!: Observable<MatchedEvents>;
  eventId!: string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id); // ეს არის ორგანიზაციიდან რომ გადმოვა მაშინ ურლ-დან ამოღებული პარამეტრი
    this.eventId = id || '';
    this.matchService.aiMatch(id).subscribe(() => {
      this.matchedEvents$ = this.matchService.getMatches(1, 6, id);
    });

    // this.matchedEvents$ = this.matchService.getMatches(1, 6, id);
    //ეს არის მოხალისსისთვის
  }

  onRequestMatch(id: string) {
    if (this.matchService.authService.isVolunteer()) {
      this.matchService
        .requestForVolunteer(id)
        .subscribe(() => (this.matchedEvents$ = this.matchService.getMatches(1, 6, null)));
    } else {
      this.onRequestMatchOrg(id);
    }
  }

  onRejectMatch(id: string) {
    if (this.matchService.authService.isVolunteer()) {
      this.matchService
        .rejectForVolunteer(id)
        .subscribe(() => (this.matchedEvents$ = this.matchService.getMatches(1, 6, null)));
    } else {
      this.onRejectMatchOrg(id);
    }
  }

  onRequestMatchOrg(id: string) {
    this.matchService
      .requestForOrg(this.eventId, id)
      .subscribe(() => (this.matchedEvents$ = this.matchService.getMatches(1, 6, this.eventId)));
  }

  onRejectMatchOrg(id: string) {
    this.matchService
      .rejectForOrg(this.eventId, id)
      .subscribe(() => (this.matchedEvents$ = this.matchService.getMatches(1, 6, this.eventId)));
  }
}
