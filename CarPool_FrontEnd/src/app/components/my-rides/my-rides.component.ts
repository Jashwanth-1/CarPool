import { Component, OnInit } from '@angular/core';
import { RideCard } from '../../models/RideCard';
import { ToastrService } from 'ngx-toastr';
import { RideApiService } from '../../services/ride-api.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css'],
})
export class MyRidesComponent implements OnInit {
  bookedRides: RideCard[] = [];
  offeredRides: RideCard[] = [];
  constructor(
    private rideApiService: RideApiService,
    private toastr: ToastrService
  ) {}

  reverseDate(rides: RideCard[]) {
    for (let ride of rides) {
      let date = ride.date.split('-');
      ride.date = date.reverse().join('-');
      console.log(ride.date);
    }
  }

  ngOnInit(): void {
    Notiflix.Loading.circle('Getting your rides');
    this.rideApiService.getBookedRides().subscribe({
      next: (data) => {
        Notiflix.Loading.remove(), (this.bookedRides = data.data);
        this.reverseDate(this.bookedRides);
      },
      error: (data) => {
        Notiflix.Loading.remove();
        if (data.error.errorMessage != null) {
          this.toastr.error(data.error.errorMessage);
        }
      },
    });
    this.rideApiService.getOfferedRides().subscribe({
      next: (data) => {
        Notiflix.Loading.remove(), (this.offeredRides = data.data);
        this.reverseDate(this.offeredRides);
      },
      error: (data) => {
        Notiflix.Loading.remove();
        if (data.error.errorMessage != null) {
          this.toastr.error(data.error.errorMessage);
        } else {
          this.toastr.error('SOmething went Wrong');
        }
      },
    });
  }
}
