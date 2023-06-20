import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/item.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private API_URL = 'http://localhost:5000/items';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL).pipe(
      catchError((error) => {
        console.error(error);
        this.snackBar.open('Error occurred while retrieving items.', '', {
          duration: 2000,
        });
        return throwError(error);
      })
    );
  }

  getItem(id: string) {
    return this.http.get(`${this.API_URL}/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        this.snackBar.open('Error occurred while retrieving item.', '', {
          duration: 2000,
        });
        return throwError(error);
      })
    );
  }
}
