import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Patterns } from 'src/app/models/Patterns';
import { RoutingService } from 'src/app/services/routing.service';
import { AuthApiService } from 'src/app/services/auth-api.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private routingService: RoutingService,
    private authApiService: AuthApiService,
    private toastr: ToastrService
  ) {}

  isPasswordHidden: boolean = true;

  logInForm!: FormGroup;

  showPassword() {
    this.isPasswordHidden = true;
  }
  hidePassword() {
    this.isPasswordHidden = false;
  }

  submitForm() {
    Notiflix.Loading.circle('Loading ...');
    let user = new User();
    user.emailId = this.logInForm.get('emailId')?.value;
    user.password = this.logInForm.get('password')?.value;
    const helper = new JwtHelperService();
    this.authApiService.loginUser(user).subscribe({
      next: (data) => {
        this.toastr.success('Login Sucessfull!', 'Login', { timeOut: 2000 });
        localStorage.setItem('token', data.data);
        const decodedToken = helper.decodeToken(localStorage.getItem('token')!);
        localStorage.setItem(
          'user',
          JSON.parse(JSON.stringify(decodedToken.user))
        );
        Notiflix.Loading.remove();
        this.openHomePage();
      },
      error: (data) => {
        Notiflix.Loading.remove();
        console.log(data.error);
        if (data.error.errorMessage != null) {
          this.toastr.error(data.error.errorMessage);
        } else {
          this.toastr.error('Something Went Wrong');
        }
      },
    });
  }

  openSignUpPage() {
    this.routingService.openSignUpPage();
  }

  openHomePage() {
    this.routingService.openHomePage();
  }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(Patterns.password),
        Validators.minLength(6),
      ]),
    });
  }
}
