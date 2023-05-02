import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/User';
import { UserApiService } from '../../services/user-api.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userApiService: UserApiService,
    private toastr: ToastrService
  ) {}
  isEditClicked = true;
  user = new User();

  editProfile() {
    this.isEditClicked = false;
  }

  saveProfile() {
    Notiflix.Loading.circle('Saving changes');
    this.isEditClicked = true;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.userApiService.updateUser(this.user).subscribe({
      next: (data) => {
        Notiflix.Loading.remove(),
          this.toastr.success('Profile Updated successfully');
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

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
