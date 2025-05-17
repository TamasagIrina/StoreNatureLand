import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { cartProduct } from '../interfaces/cartProduct.interface';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-cart',
  imports: [MatIconModule, HttpClientModule, AsyncPipe, CartItemComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  host: {
    'class': 'cart-row',
    'style': 'display: contents;'
  }
})



export class CartComponent {
  catrPorduct: cartProduct[] = []
 
  total: number = 0;
  constructor(readonly router: Router, protected dataService: DataService) {

  }
  ngOnInit() {
    

    this.dataService.getCartProduct(localStorage.getItem('id') as unknown as number);
    this.updatePrice();
    
  }

  updatePrice() {
    this.total = 0;
    
    this.dataService.getCartProductsSubject.subscribe(products => {
      for (const prod of products) {
        this.total += prod.productPrice * prod.amount;
      

      }

    });


  }

  purchaseButton() {
     this.router.navigate(['/mainPage/purchase'], {
      state: { total: this.total }
    });

  }




}





function round(arg0: number) {
  throw new Error('Function not implemented.');
}

