import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OrganizationProfileService } from './organization-profile.service';
import { OrganizationModel } from './organization-profile.model';

@Component({
  selector: 'app-organization-profile',
  imports: [],
  templateUrl: './organization-profile.html',
  styleUrl: './organization-profile.scss',
})
export class OrganizationProfile implements OnInit {
  profileInfo!: OrganizationModel;
  private service = inject(OrganizationProfileService);
  //ვერ მომქონდა დატა რეგისტრაციის დროს არ ჩანდა html-ში და ჯიპიტიმ მითხრა
  //რო ეს პრაივეტ ცვლადი შექმენი და შემოაინჯექტე ChangeDetectorRef
  //ui-ის ეუბნებაო რო დარეფრეშდესო და თავიდან შეამოწმოსო დატაო(ეს ავხსნათ ფლზ მერე კარგად)
  // private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.service.getProfileInfo().subscribe({
      next: (res) => {
        this.profileInfo = res;
        // this.cdr.detectChanges();
        console.log('წამოვიდა ორგანიზაციის პროფილის ინფო: ', this.profileInfo);
      },
      error: (err) => {
        console.log('Organization profile error:', err);
      },
    });
  }
}
