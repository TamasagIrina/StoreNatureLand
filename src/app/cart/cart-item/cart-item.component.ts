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
  constructor(private database: DataService, private cart: CartComponent) {
  
  }
  @Input() cartProduct!: cartProduct;
  inputValue: any;

  updateQuantity() {

    this.database.updateAmount(this.cartProduct.cartId, this.cartProduct.amount).subscribe({
      next: (response) => {
        console.log(response);
        this.database.updateCartAmount();
  
      }
    });
    this.cart.updatePrice();

  }

  deleteButton() {

    let personId: number = localStorage.getItem('id') as unknown as number;
    this.database.getProductId(this.cartProduct.productName).subscribe({
      next: (id: number) => {
        if (id !== 0) {
          console.log(id)

          this.database.deleteCartItem(personId, id).subscribe({
            next: (response) => {
              if (response === 'Deleted') {
                alert(response);

                this.database.updateCartAmount();
                this.database.getCartProduct(personId);
                
              } else {
                alert(response)
              }

            },
            error: (err) => console.error('Delete failed', err)
          });

        } else {
          console.warn('Product not found');
        }
      },
      error: (err) => console.error('Error fetching product ID', err)
    });


  }

}
