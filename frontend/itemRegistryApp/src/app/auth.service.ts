import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    const tokenFromStorage = localStorage.getItem('token');
    let user = null;
    if (tokenFromStorage) {
      user = { token: tokenFromStorage };
    }
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`http://localhost:5000/users/login`, {
        username,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next({ token: response.token });
          return response;
        }),
        catchError((error) => {
          console.error(error);
          this.snackBar.open('Error occurred while logging in.', '', {
            duration: 2000,
          });
          return throwError(error);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  register(username: string, password: string) {
    return this.http
      .post<any>(`http://localhost:5000/users/register`, {
        username,
        password,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.snackBar.open('Error occurred while registering.', '', {
            duration: 2000,
          });
          return throwError(error);
        })
      );
  }
}
