import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  item: any;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id') ?? '';
    this.itemService.getItem(itemId).subscribe((item: any) => {
      this.item = item;
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this item?')) {
      this.http
        .delete(`http://localhost:5000/items/${this.item._id}`)
        .subscribe(
          (response) => {
            console.log(response);
            this.snackBar.open('Item deleted successfully!', '', {
              duration: 2000,
            });
            this.router.navigate(['/items']);
          },
          (error) => {
            console.error(error);
            this.snackBar.open('Error occurred while deleting item.', '', {
              duration: 2000,
            });
          }
        );
    }
  }
}
