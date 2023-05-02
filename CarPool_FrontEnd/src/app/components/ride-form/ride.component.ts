import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../models/Patterns';
import { TimeSlotsService } from '../../services/time-slots.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css'],
})
export class RideComponent implements OnInit {
  constructor(private timeSlotservice: TimeSlotsService) {
    this.timeslotFlags = this.timeSlotservice.timeslotFlags;
    this.timeSlots = this.timeSlotservice.timeSlots;
  }

  rideForm!: FormGroup;

  timeSlots: any;
  timeslotFlags: any;
  currentDate = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.rideForm = new FormGroup({
      toLocation: new FormControl('', [
        Validators.required,
        Validators.pattern(Patterns.locations),
      ]),
      fromLocation: new FormControl('', [
        Validators.required,
        Validators.pattern(Patterns.locations),
      ]),
      date: new FormControl('', [Validators.required]),
    });
    this.timeSlotservice.rideValues.next(this.rideForm);
    this.timeSlotservice.timeslotFlagSub.subscribe((Value) => {
      this.timeslotFlags = Value;
    });
  }

  time(i: number) {
    this.timeSlotservice.time(i);
  }
}
