import { Component, Input } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { Router } from '@angular/router';

import { cart } from '../interfaces/cart.interface';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product!: product;
  @Input() cartProduct!: cart;

   constructor(private router: Router, private database:DataService) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
  }

 

    addButtonOnAcction() {
    let id: number = localStorage.getItem('id') as unknown as number;
 
    this.cartProduct = {} as cart;
    this.cartProduct.amount = 1;
    this.cartProduct.personid = id;
    this.cartProduct.product = this.product
   
    this.database.addProdactToCart(this.cartProduct as Omit<cart, 'id'>)
      .subscribe({
        next: (res) => {
          if (res === "added") {
            alert('Product added in cart');
            this.database.getCartProduct(id);
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
