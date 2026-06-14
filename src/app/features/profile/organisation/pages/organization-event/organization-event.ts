import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-event',
  imports: [],
  templateUrl: './organization-event.html',
  styleUrl: './organization-event.scss',
})
export class OrganizationEvent implements OnInit {
  private route = inject(ActivatedRoute);
  editMode = false;

  ngOnInit() {
    // queryParamMap returns an observable map of parameters
    this.route.queryParamMap.subscribe((params) => {
      this.editMode = !!params.get('eventId');
    });
  }
}
