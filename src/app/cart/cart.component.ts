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
  protected sentProductsSubject = new BehaviorSubject<cartProduct[]>([]);
  sentProducts$ = this.sentProductsSubject.asObservable();
  total: number = 0;
  constructor(readonly router: Router, private dataService: DataService, private nav: NavComponent) {

  }
  ngOnInit() {
    let id: number;
    this.dataService.getUserId(localStorage.getItem('email') || "").subscribe({
      next: (response) => {

        id = response as number;
        console.log(id as number);
        this.dataService.getCartProduct(id).subscribe({
          next: (response) => {
            this.sentProductsSubject.next(response);

          }
        });
      }
    });


    this.updatePrice();

  }

  updatePrice() {
    this.total = 0;
    this.nav.amount = 0;
    this.sentProductsSubject.subscribe(products => {
      for (const prod of products) {
        this.total += prod.productPrice * prod.amount;
        this.nav.amount += prod.amount;
      }




    });


  }

  purchaseButton() {
    this.router.navigateByUrl('mainPage/purchase');

  }




}





function round(arg0: number) {
  throw new Error('Function not implemented.');
}

