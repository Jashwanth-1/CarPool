import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-select-ride',
  templateUrl: './select-ride.component.html',
  styleUrls: ['./select-ride.component.css'],
})
export class SelectRideComponent implements OnInit {
  constructor(private routingService: RoutingService) {}
  userName: any;

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.userName = user.firstName + ' ' + user.lastName;
  }

  openBookRidePage() {
    this.routingService.openBookRidePage();
  }
  openOfferRidePage() {
    this.routingService.openOfferRidePage();
  }
}
