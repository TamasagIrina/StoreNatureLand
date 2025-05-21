import { Component, Input } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { Type } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { product } from '../interfaces/product.interface';
import { ProductCardComponent } from "./product-card/product-card.component";
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';




export interface StoreComponent {
  label: string;
  content: Type<any>;  
}

@Component({
  selector: 'app-store',
  imports: [MatCardModule, MatButtonModule, MatIconModule, ProductCardComponent,AsyncPipe, FormsModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {

 copyProducts: product[]=[]


  searchValue: any;


  constructor(readonly router: Router, protected databese: DataService){

  }
  ngOnInit(){
    this.databese.getProducts();

   
   this.databese.sentProductsSubject.subscribe(products => {
     this.copyProducts= products;

    });


  }

 filterValues(){
      this.copyProducts= this.copyProducts.filter((products) => 
      products.productName.toUpperCase().includes(this.searchValue.toUpperCase()))
    }

}
