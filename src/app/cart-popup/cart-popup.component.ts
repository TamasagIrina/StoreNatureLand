import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartItemComponent } from "../cart/cart-item/cart-item.component";

@Component({
  selector: 'app-cart-popup',
  imports: [CommonModule, AsyncPipe, CartItemComponent],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.scss'
})
export class CartPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<CartPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    protected dataService: DataService) { }

 

  close(): void {
    this.dialogRef.close();
  }

  goToCart(): void {
    this.router.navigateByUrl("/mainPage/cart")
    this.dialogRef.close('go-to-cart');
  }

}
