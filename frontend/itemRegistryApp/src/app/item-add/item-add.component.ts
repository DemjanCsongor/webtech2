import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss'],
})
export class ItemAddComponent implements OnInit {
  @ViewChild('addItemForm', { static: false }) addItemForm!: NgForm;
  name!: string;
  description!: string;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.http
      .post<any>('http://localhost:5000/items', this.addItemForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open('Item added successfully!', '', {
            duration: 2000,
          });
          this.router.navigate(['/items']);
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Error occurred while adding item.', '', {
            duration: 2000,
          });
        }
      );
  }
}
