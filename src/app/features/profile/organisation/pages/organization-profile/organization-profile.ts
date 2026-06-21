import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OrganizationProfileService } from './organization-profile.service';
import { OrganizationModel } from './organization-profile.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EventList } from '../../../../../home/components/EventList/event-list';
import { EventModel } from '../organization-event/organization-event.model';
import { EventService } from '../organization-event/organization-event.service';
@Component({
  selector: 'app-organization-profile',
  imports: [CommonModule, MatIconModule, EventList],
  templateUrl: './organization-profile.html',
  styleUrl: './organization-profile.scss',
})
export class OrganizationProfile implements OnInit {
  profileInfo$!: Observable<OrganizationModel>;
  service = inject(OrganizationProfileService);
  private router = inject(Router);
  private eventsService = inject(EventService);
  myEvents$!: Observable<EventModel[]>;
  //ვერ მომქონდა დატა რეგისტრაციის დროს არ ჩანდა html-ში და ჯიპიტიმ მითხრა
  //რო ეს პრაივეტ ცვლადი შექმენი და შემოაინჯექტე ChangeDetectorRef
  //ui-ის ეუბნებაო რო დარეფრეშდესო და თავიდან შეამოწმოსო დატაო(ეს ავხსნათ ფლზ მერე კარგად)
  // private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.myEvents$ = this.eventsService.getOrganizationEvents();
  }

  onNavigateToEdit() {
    this.router.navigateByUrl('organization/edit');
  }

  onNavigateToEvent() {
    this.router.navigate(['organization/events']);
  }

  // ეს გასატანი იქნება ივენთის ქარდში
  onNavigateToEventEdit() {
    // this.router.navigate(['organization/event/edit'], { queryParams: { eventId } });
  }
}
