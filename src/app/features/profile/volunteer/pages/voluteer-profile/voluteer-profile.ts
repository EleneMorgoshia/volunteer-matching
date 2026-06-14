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
  private router = inject(Router);
  service = inject(VolunteerProfileService);
  private cdr = inject(ChangeDetectorRef); //აქაც იგივე დატას წამოღებისთვის(ორგანიზაციის ფაილი ნახე)

  ngOnInit(): void {}

  onNavigateToEdit() {
    this.router.navigateByUrl('volunteer/edit').then();
  }
}
