import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetailsComponent } from '../../product-details/product-details.component';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {


  @Input() product!: product;
  @Output() seeMoreProduct = new EventEmitter<product>();

  constructor(readonly router: Router){}
  seeMoreButton(){
   this.router.navigate(['/mainPage/details'], {
      state: { product: this.product }
    });
  }
  addButtonOnAcction(){
    console.log(this.product.productName)
  }
}
