import { Component, Input } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { Router } from '@angular/router';

import { cart } from '../interfaces/cart.interface';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product!: product;
  @Input() cartProduct!: cart;

  user: User = JSON.parse(localStorage.getItem('user') || "") as User;

  constructor(private router: Router, private database: DataService, private dialog: MatDialog) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
  }


  backButton() {
    this.router.navigateByUrl("mainPage/store");
  }
  addButtonOnAcction() {
    let id: number = this.user.id;

    this.cartProduct = {} as cart;
    this.cartProduct.amount = 1;
    this.cartProduct.personid = id;
    this.cartProduct.product = this.product

    this.database.addProdactToCart(this.cartProduct as Omit<cart, 'id'>)
      .subscribe({
        next: (res) => {

          this.dialog.open(CartPopupComponent, {
            width: '550px',
            height: 'auto',
            maxHeight: '580px',
            data: {
              resp: res
            }
          });
          this.database.getCartProduct(id);
          this.database.updateCartAmount();


        },
        error: (err) => {
          console.error('Error:', err);

        }
      });



  }
}
