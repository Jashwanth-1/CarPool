import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName!: any;

  openMyRidesPage() {
    this.carPoolService.openMyRidesPage();
  }

  openHomePage() {
    this.carPoolService.openHomePage();
  }

  openLoginPage() {
    this.carPoolService.openLoginPage();
    this.toastr.success('Logout Successfull');
    localStorage.clear();
  }

  openProfilePage() {
    this.carPoolService.openProfilePage();
  }

  constructor(
    private toastr: ToastrService,
    private carPoolService: RoutingService
  ) {}

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user != null) {
      this.userName = user.firstName + ' ' + user.lastName;
    }
  }
}
