import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EventDetailModel } from './event-details-model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss',
})
export class EventDetails {
  private router = inject(Router);

  goToHomeEvents(): void {
    this.router.navigateByUrl('home').then();
  }

  event: EventDetailModel = {
    title: 'Random Event Name',

    organizationName: 'Random Organisation name',
    organizationEmail: 'RandomOrganisation@gmail.com',
    organizationLogoUrl: '',

    description:
      'შემოგვიერთდით ტექნოლოგიური სფეროს წარმომადგენლებსა და ციფრულ მომავალზე ორიენტირებულ ღონისძიებაზე. მონაწილეები მიიღებენ ცოდნას თანამედროვე ტრენდებზე, გაუზიარებენ ერთმანეთს გამოცდილებას და დაამყარებენ ახალ პროფესიულ კავშირებს.',

    requirements: [
      'კარგი კომუნიკაციის უნარი და მონაწილეებთან აქტიური ურთიერთობა',
      'დროის მართვის უნარი და პასუხისმგებლობა',
      'ღონისძიების მიმდინარეობისას ორგანიზატორებთან კოორდინაცია',
    ],

    speakers: [
      {
        fullName: 'ელენე მორგოშია',
        profession: 'დეველოპერი',
      },
      {
        fullName: 'ელენე მორგოშია',
        profession: 'დეველოპერი',
      },
      {
        fullName: 'ელენე მორგოშია',
        profession: 'დეველოპერი',
      },
      {
        fullName: 'ელენე მორგოშია',
        profession: 'დეველოპერი',
      },
    ],

    benefits: [
      'გამოცდილების დაგროვება რეალურ ღონისძიებაზე',
      'მონაწილეობის სერტიფიკატი და პროფესიული კავშირების შექმნა ორგანიზაციასთან',
    ],

    location: 'Fabrika Tbilisi, თბილისი',
    startDate: '2026/02/24, 16:00',
    endDate: '18:00',
    theme: 'ტექნოლოგიები და ნეთვორქინგი',

    additionalInfo: 'ივენთის შესახებ განსაკუთრებული ინფორმაცია',

    mainPhotoUrl: '',
    galleryPhotoUrls: [],
  };
}
