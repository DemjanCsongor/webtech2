import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.http
      .post<any>('http://localhost:5000/users/login', this.loginForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.snackBar.open('Logged in successfully!', '', { duration: 2000 });
          let returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/items';
          this.router.navigateByUrl(returnUrl).catch((error) => {
            console.error(error);
            this.snackBar.open(
              'Error occurred while navigating to items.',
              '',
              { duration: 2000 }
            );
          });
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Error occurred while logging in.', '', {
            duration: 2000,
          });
        }
      );
  }
}
