import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../services/data.service';
import { product } from '../interfaces/product.interface';

@Component({
  selector: 'app-add-products',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {

  constructor(private database:DataService){

  }

  addRecipeForm = new FormGroup({
    productBrand: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productImg: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productPrice: new FormControl(0, [Validators.required, Validators.minLength(3)]),

  })

  addBotton(){
    this.database.addProdact(this.addRecipeForm.value as Omit<product, 'id'>)
          .subscribe({
            next: (res) => {
              if (res === "Product added") {
                alert('Product added!');
              } else {
                alert('Product exist. ');
              }
    
            },
            error: (err) => {
              console.error('Error:', err);
              
            }
          });
  }
}
