import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';


@Component({
  selector: 'app-cart',
  imports: [MatIconModule,HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})



export class CartComponent  {

  constructor(readonly router: Router, private dataService: DataService){

  }
 

  purchaseButton(){
    this.router.navigateByUrl('mainPage/purchase');

  }

  getdate(){
    this.dataService.getProduct().subscribe({
      next  : (response)=>{
        console.log(response.map(cart =>cart.personID));
      }
    });
  }

  

  
}
