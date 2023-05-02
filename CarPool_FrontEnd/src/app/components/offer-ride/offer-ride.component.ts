import { Component, OnInit } from '@angular/core';
import { BookRide } from '../../models/BookRide';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { OfferRide } from '../../models/OfferRide';
import { ToastrService } from 'ngx-toastr';
import { Patterns } from '../../models/Patterns';
import { TimeSlotsService } from '../../services/time-slots.service';
import { RoutingService } from '../../services/routing.service';
import { RideApiService } from '../../services/ride-api.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css'],
})
export class OfferRideComponent implements OnInit {
  constructor(
    private timeSlotService: TimeSlotsService,
    private formBuilder: FormBuilder,
    private rideApiService: RideApiService,
    private toastr: ToastrService,
    private routingService: RoutingService
  ) {}

  bookedRide = new BookRide();
  rideForm!: FormGroup;
  isBooked = true;
  isNextClicked = true;

  stopForm!: FormGroup;

  ngOnInit(): void {
    this.timeSlotService.rideValues.subscribe((value) => {
      this.rideForm = value;
    });
    this.stopForm = this.formBuilder.group({
      stops: this.formBuilder.array(['']),
      price: this.formBuilder.control(0, Validators.pattern(Patterns.numbers)),
    });
  }

  seats: number[] = [1, 2, 3];
  seatFlags: boolean[] = [false, false, false];

  openBookRidePage() {
    this.routingService.openBookRidePage();
  }

  submitOfferRide() {
    Notiflix.Loading.circle('Offering Your Ride');
    let offeredRide = new OfferRide();
    offeredRide.fromLocation = this.rideForm.get('fromLocation')?.value;
    offeredRide.toLocation = this.rideForm.get('toLocation')?.value;
    offeredRide.date = this.rideForm.get('date')?.value;
    let timeslot: string = '';
    let stops = this.getStops();
    let timeSlotFlags = this.timeSlotService.timeslotFlags;
    for (let j = 0; j < timeSlotFlags.length; j++) {
      if (timeSlotFlags[j] == true)
        timeslot = this.timeSlotService.timeSlots[j];
    }
    offeredRide.rideTime = timeslot;
    offeredRide.price = this.stopForm.get('price')?.value;
    for (let i = 0; i < this.seats.length; i++) {
      if (this.seatFlags[i] == true) {
        offeredRide.availableSeats = this.seats[i].toString();
      }
    }
    for (let i = 0; i < stops.value.length; i++) {
      offeredRide.stops = offeredRide.stops + ',' + stops.value[i].toString();
    }
    if (offeredRide.stops.length > 1) {
      offeredRide.stops = offeredRide.stops.slice(1, offeredRide.stops.length);
    }
    this.rideApiService.offerRide(offeredRide).subscribe({
      next: (data) => {
        Notiflix.Loading.remove();
        this.toastr.success('Ride Offered!');
        this.routingService.openHomePage();
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

  nextClick() {
    this.isNextClicked = false;
  }

  getStops() {
    return this.stopForm.get('stops') as FormArray;
  }

  addStop(stop: any) {
    let stops = this.getStops();
    if (stops.value[stop] != '' && stops.value[stop] != null) {
      (this.stopForm.get('stops') as FormArray).push(new FormControl(''));
    }
  }

  seatSelected(i: number) {
    for (let j = 0; j < this.seatFlags.length; j++) {
      this.seatFlags[j] = false;
    }
    this.seatFlags[i] = true;
  }
}
