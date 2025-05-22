import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';

import { DataService } from '../../services/data.service';
import { cart } from '../../interfaces/cart.interface';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CartPopupComponent } from '../../cart-popup/cart-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule, MatMenuModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() cartProduct!: cart;
  @Input() product!: product;
  @Output() seeMoreProduct = new EventEmitter<product>();

  user:User = JSON.parse(localStorage.getItem('user') || "") as User;

  name = localStorage.getItem("status");
 

  constructor(readonly router: Router, protected database: DataService, private dialog: MatDialog) {

  }

  async onStoc() {
    this.database.updateStocToIn(this.product.id);
    await new Promise(resolve => setTimeout(resolve, 300));
    this.database.getProducts();
  }

  async outOfStoc() {
    this.database.updateStocToOut(this.product.id);
    await new Promise(resolve => setTimeout(resolve, 300));
    this.database.getProducts();
  }

  async onDelete() {
    this.database.deleteProduct(this.product.id).subscribe({
      next: () => this.database.getProducts(),
      error: (err) => console.error('Delete failed:', err)
    });
  }

  seeMoreButton() {
    this.router.navigate(['/mainPage/details'], {
      state: { product: this.product }
    });
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
