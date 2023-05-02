import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotsService {
  constructor() {}

  rideValues = new Subject<FormGroup>();
  timeslotFlagSub = new Subject();
  
  timeslotFlags = new Array<boolean>(5).fill(false);
  timeSlots = ['5am - 9am', '9am - 12pm', '12pm - 3pm', '3pm - 6pm', '6pm - 9pm'];

  time(i: number) {
    this.timeFlagAll();
    this.timeslotFlags[i] = true;
  }

  timeFlagAll() {
    this.timeslotFlags.fill(false);
  }
}
