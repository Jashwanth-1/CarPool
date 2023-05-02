import { Component, OnInit } from '@angular/core';
import { BookRide } from '../../models/BookRide';
import { FormGroup } from '@angular/forms';
import { RideCard } from '../../models/RideCard';
import { ToastrService } from 'ngx-toastr';
import { TimeSlotsService } from '../../services/time-slots.service';
import { RoutingService } from '../../services/routing.service';
import { RideApiService } from '../../services/ride-api.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css'],
})
export class BookRideComponent implements OnInit {
  constructor(
    private timeSlotService: TimeSlotsService,
    private routingService: RoutingService,
    private toastr: ToastrService,
    private rideApiService: RideApiService
  ) {}

  rideForm!: FormGroup;
  matchingRides: RideCard[] = [];
  isBooked = true;
  isFormSubmitted: boolean = false;

  ngOnInit(): void {
    this.timeSlotService.rideValues.subscribe((value) => {
      this.rideForm = value;
    });
  }

  reverseDate(rides: RideCard[]) {
    rides.forEach((ride) => {
      let date = ride.date.split('-');
      ride.date = date.reverse().join('-');
      console.log(ride.date);
    });
  }

  openOfferRidePage() {
    this.routingService.openOfferRidePage();
  }
  submitRide() {
    Notiflix.Loading.circle('Fetching the rides');
    let bookedRide = new BookRide();
    this.isFormSubmitted = true;
    bookedRide.fromLocation = this.rideForm.get('fromLocation')?.value;
    bookedRide.toLocation = this.rideForm.get('toLocation')?.value;
    bookedRide.date = this.rideForm.get('date')?.value;
    let timeslot: string = '';
    let timeSlotFlags = this.timeSlotService.timeslotFlags;
    for (let j = 0; j < timeSlotFlags.length; j++) {
      if (timeSlotFlags[j] == true)
        timeslot = this.timeSlotService.timeSlots[j];
    }
    bookedRide.rideTime = timeslot;
    this.rideApiService.getMatchingRides(bookedRide).subscribe({
      next: (data) => {
        Notiflix.Loading.remove(), (this.matchingRides = data.data);
        this.reverseDate(this.matchingRides);
      },
      error: (data) => {
        Notiflix.Loading.remove();
        if (data.error.errorMessage != null) {
          this.toastr.error(data.error.errorMessage);
        } else {
          this.toastr.error('Something went Wrong');
        }
      },
    });
    this.isBooked = false;
  }
}
