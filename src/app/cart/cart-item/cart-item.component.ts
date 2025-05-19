import { Component, Input } from '@angular/core';
import { cartProduct } from '../../interfaces/cartProduct.interface';
import { product } from '../../interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CartComponent } from '../cart.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-cart-item',
  imports: [ MatCardModule,MatCardModule,MatIconModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  constructor(private database: DataService) {

  }
  @Input() cartProduct!: cartProduct;
  inputValue: any;

  updateQuantity() {

    this.database.updateAmount(this.cartProduct.cartId, this.cartProduct.amount).subscribe({
      next: (response) => {
        console.log(response);
        this.database.updateCartAmount();
        this.database.updatePrice();

      }
    });


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

                this.database.getCartProduct(personId);
                this.database.updateCartAmount();
                this.database.updatePrice();

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
