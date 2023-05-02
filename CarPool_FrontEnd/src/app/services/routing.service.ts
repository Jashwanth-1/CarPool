import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSlotsService } from './time-slots.service';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private router: Router, private timeService: TimeSlotsService) {}

  openSignUpPage() {
    this.router.navigate(['']);
  }

  openHomePage() {
    this.router.navigate(['/select-ride']);
  }

  openLoginPage() {
    this.router.navigate(['/login']);
  }

  openOfferRidePage() {
    this.router.navigate(['/offer-ride']);
    this.timeService.timeFlagAll();
  }

  openBookRidePage() {
    this.router.navigate(['/book-ride']);
    this.timeService.timeFlagAll();
  }

  openMyRidesPage() {
    this.router.navigate(['/my-rides']);
  }

  openProfilePage() {
    this.router.navigate(['/profile']);
  }
}
