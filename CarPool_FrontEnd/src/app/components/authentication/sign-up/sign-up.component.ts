import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Patterns } from 'src/app/models/Patterns';
import { RoutingService } from 'src/app/services/routing.service';
import { AuthApiService } from 'src/app/services/auth-api.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private routingService: RoutingService,
    private authApiService: AuthApiService,
    private toastr: ToastrService
  ) {}

  isPasswordHidden: boolean = true;

  signUpForm!: FormGroup;
  user = new User();

  showPassword() {
    this.isPasswordHidden = true;
  }
  hidePassword() {
    this.isPasswordHidden = false;
  }

  submitForm() {
    Notiflix.Loading.circle('Loading...');
    this.user.splitName(this.signUpForm.get('fullName')?.value);
    this.authApiService.signUpUser(this.user).subscribe({
      next: () => {
        this.toastr.success('SignUp Sucessfull!');
        console.log(this.user);
        Notiflix.Loading.remove();
        this.openLoginPage();
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
  }

  openLoginPage() {
    this.routingService.openLoginPage();
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(Patterns.password),
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
}
