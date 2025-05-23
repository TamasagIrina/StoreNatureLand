import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { product } from '../interfaces/product.interface';
import { ProductCardComponent } from "./product-card/product-card.component";
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tick } from '@angular/core/testing';




export interface StoreComponent {
  label: string;
  content: Type<any>;
}

@Component({
  selector: 'app-store',
  imports: [MatCardModule, MatButtonModule, MatIconModule, ProductCardComponent, AsyncPipe, FormsModule, CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {

  filtredProducts$ = new Observable<product[]>;

  searchProducts$ = new BehaviorSubject<string>("");

  searchValue: string = "";

  categories = ['All', 'Tea', 'Dried Fruits', 'Essential Oil'];

  selectedCategory = 'All';


  constructor(readonly router: Router, protected databese: DataService) {

  }
  ngOnInit() {
    this.databese.getProducts();

    this.initialValues();


  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    if(category!='All'){
      this.searchProducts$.next(category.split(" ")[0]);
    }else{
      this.searchProducts$.next('');
    }
    
  }

  initialValues() {
    this.filtredProducts$ = combineLatest([
      this.databese.sentProducts$,
      this.searchProducts$.pipe(startWith(""))
    ]).pipe(
      map(([products, search]) =>
        products.filter(product => product.productName.toLowerCase().includes(search.toLowerCase()))
      )
    )
  }

  filterValues(value: string) {
    this.searchValue = value;
    this.searchProducts$.next(value);
  }

}
