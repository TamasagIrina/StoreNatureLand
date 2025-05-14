import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-products',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {
  addRecipeForm= new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productBrand: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productPrice: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productImg: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })
}
