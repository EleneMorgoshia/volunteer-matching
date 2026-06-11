import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OrganizationProfileService } from './organization-profile.service';
import { OrganizationModel } from './organization-profile.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-organization-profile',
  imports: [CommonModule,MatIconModule],
  templateUrl: './organization-profile.html',
  styleUrl: './organization-profile.scss',
})
export class OrganizationProfile implements OnInit {
  profileInfo$!: Observable<OrganizationModel>;
  private service = inject(OrganizationProfileService);
  //ვერ მომქონდა დატა რეგისტრაციის დროს არ ჩანდა html-ში და ჯიპიტიმ მითხრა
  //რო ეს პრაივეტ ცვლადი შექმენი და შემოაინჯექტე ChangeDetectorRef
  //ui-ის ეუბნებაო რო დარეფრეშდესო და თავიდან შეამოწმოსო დატაო(ეს ავხსნათ ფლზ მერე კარგად)
  // private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.profileInfo$ = this.service.getProfileInfo();
  }
  onNavigateToEdit(){
    return ;
  }
}
