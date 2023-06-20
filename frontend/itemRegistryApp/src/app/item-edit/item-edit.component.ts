import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.http
        .get<Item>(`http://localhost:5000/items/${itemId}`)
        .subscribe((item) => {
          this.item = item;
        });
    }
  }

  onSubmit() {
    this.http
      .put(`http://localhost:5000/items/${this.item._id}`, this.item)
      .subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open('Item updated successfully!', '', {
            duration: 2000,
          });
          this.router.navigate(['/items']);
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Error occurred while updating item.', '', {
            duration: 2000,
          });
        }
      );
  }
}
