import { Component, Input } from '@angular/core';
import { cartProduct } from '../../interfaces/cartProduct.interface';
import { product } from '../../interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-cart-item',
  imports: [FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  constructor(private database: DataService, private cart: CartComponent){

  }
   @Input() cartProduct!: cartProduct;
    inputValue: any;
   
   updateQuantity(){
    console.log(this.cartProduct.amount as number);
    console.log(this.cartProduct.cartId)
    this.database.updateAmount(this.cartProduct.cartId, this.cartProduct.amount).subscribe({
                next  : (response)=>{
                  console.log(response);
                  
                }
              });
      this.cart.updatePrice();
   }

}
