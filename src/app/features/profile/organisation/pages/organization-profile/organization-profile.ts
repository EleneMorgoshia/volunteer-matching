import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OrganizationProfileService } from './organization-profile.service';
import { OrganizationModel } from './organization-profile.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-organization-profile',
  imports: [CommonModule, MatIconModule],
  templateUrl: './organization-profile.html',
  styleUrl: './organization-profile.scss',
})
export class OrganizationProfile implements OnInit {
  profileInfo$!: Observable<OrganizationModel>;
  service = inject(OrganizationProfileService);
  private router = inject(Router);
  //ვერ მომქონდა დატა რეგისტრაციის დროს არ ჩანდა html-ში და ჯიპიტიმ მითხრა
  //რო ეს პრაივეტ ცვლადი შექმენი და შემოაინჯექტე ChangeDetectorRef
  //ui-ის ეუბნებაო რო დარეფრეშდესო და თავიდან შეამოწმოსო დატაო(ეს ავხსნათ ფლზ მერე კარგად)
  // private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {}

  onNavigateToEdit() {
    this.router.navigateByUrl('organization/edit');
  }
}
