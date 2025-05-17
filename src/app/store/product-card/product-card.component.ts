import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';

import { DataService } from '../../services/data.service';
import { cart } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() cartProduct!: cart;
  @Input() product!: product;
  @Output() seeMoreProduct = new EventEmitter<product>();

  constructor(readonly router: Router, private database: DataService) { }
  seeMoreButton() {
    this.router.navigate(['/mainPage/details'], {
      state: { product: this.product }
    });
  }
  addButtonOnAcction() {
    let id: number = localStorage.getItem('id') as unknown as number;
    console.log(id);
    this.cartProduct = {} as cart;
    this.cartProduct.amount = 1;
    this.cartProduct.personid = id;
    this.cartProduct.product = this.product
    console.log(this.cartProduct);
    this.database.addProdactToCart(this.cartProduct as Omit<cart, 'id'>)
      .subscribe({
        next: (res) => {
          if (res === "added") {
            alert('Product added in cart');
            this.database.updateCartAmount();
          } else {
            alert('Account allredy have this in cart');
          }

        },
        error: (err) => {
          console.error('Error:', err);

        }
      });

    

  }

  

}
