import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RideCard } from '../../models/RideCard';
import { RoutingService } from '../../services/routing.service';
import { RideApiService } from '../../services/ride-api.service';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css'],
})
export class RideCardComponent implements OnInit {
  @Input() rides: RideCard[] = [];

  constructor(
    private rideaApiService: RideApiService,
    public router: Router,
    private toastr: ToastrService,
    private routingService: RoutingService
  ) {}

  selectedRide!: RideCard;

  reverseDate(ride: RideCard) {
    let date = ride.date.split('-');
    ride.date = date.reverse().join('-');
    return ride;
  }

  showRide(i: number) {
    this.selectedRide = this.rides[i];
  }

  bookRide(selectedRide: any) {
    selectedRide = this.reverseDate(selectedRide);
    this.rideaApiService.bookRide(selectedRide).subscribe({
      next: (data) => {
        this.toastr.success('Booking Successfull!'),
          this.routingService.openMyRidesPage();
      },
      error: (data) => {
        this.toastr.error(data.error.errorMessage);
      },
    });
  }

  ngOnInit(): void {}
}
