import { Component, Input } from '@angular/core';
import { product } from '../interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product!: product;

   constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
  }

  ngOnInit() {
    console.log(this.product);
  }
}
