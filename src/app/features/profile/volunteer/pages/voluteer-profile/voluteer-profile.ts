import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { VolunteerModel } from './volunteer-profile.model';
import { VolunteerProfileService } from './volunteer-profile.service';

@Component({
  selector: 'app-voluteer-profile',
  imports: [MatIconModule],
  templateUrl: './voluteer-profile.html',
  styleUrl: './voluteer-profile.scss',
})
export class VoluteerProfile {
   profileInfo!: VolunteerModel;

  private router = inject(Router);
  private service = inject(VolunteerProfileService);
  private cdr = inject(ChangeDetectorRef); //აქაც იგივე დატას წამოღებისთვის(ორგანიზაციის ფაილი ნახე)

   ngOnInit(): void {
    this.service.getProfileInfo().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.profileInfo = res;
          this.cdr.detectChanges();
          console.log('წამოვიდა მოხალისის პროფილის ინფო: ', this.profileInfo);
        });
      },
      error: (err) => {
         console.log('Volunteer registration error full:', err);
  console.log('Backend error body:', err.error);
      },
    });
  }
  
  onNavigateToEdit() {
    this.router.navigateByUrl('volunteer/edit').then();
  }
}
