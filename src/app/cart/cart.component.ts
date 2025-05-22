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
import { User } from '../interfaces/user.interface';


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
   user:User = JSON.parse(localStorage.getItem('user') || "") as User;
 
  
  constructor(readonly router: Router, protected dataService: DataService) {

  }
  ngOnInit() {
    
    this.dataService.getCartProduct(this.user.id);
    this.dataService.updatePrice();
    
  }

 
  purchaseButton() {
     this.router.navigateByUrl('/mainPage/purchase');
    

  }

    backButton() {
     this.router.navigateByUrl('/mainPage/store');
    

  }




}



