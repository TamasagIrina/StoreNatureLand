import { Component, inject, Input } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { oreder } from '../interfaces/order.interface';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { OrderStatus } from '../interfaces/orderStatus.interfac';
import { User } from '../interfaces/user.interface';
import { CartItemComponent } from "../cart/cart-item/cart-item.component";
@Component({
  selector: 'app-purchase',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    // BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    MatIconModule,
    CartItemComponent
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {

  @Input() order!: oreder;

  paymentForm: FormGroup;
  showCardFields = false;
  canPurchase = false;

  user: User = JSON.parse(localStorage.getItem('user') || "") as User;

  today = new Date();
  formatted = this.today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  constructor(private fb: FormBuilder, private router: Router, protected dataService: DataService) {
    this.paymentForm = this.fb.group({
      method: [''],
      cardName: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });


    this.paymentForm.valueChanges.subscribe(() => {
      const method = this.paymentForm.get('method')?.value;

      if (method === 'card') {
        const valid =
          this.paymentForm.get('cardName')?.valid &&
          this.paymentForm.get('cardNumber')?.valid &&
          this.paymentForm.get('expiry')?.valid &&
          this.paymentForm.get('cvv')?.valid;

        this.canPurchase = !!valid;
      } else if (method === 'cash') {
        this.canPurchase = true;
      } else {
        this.canPurchase = false;
      }
    });

    this.dataService.updatePrice();

  }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstNameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    addressCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
  });
  isEditable = false;

  onMethodChange() {
    const method = this.paymentForm.get('method')?.value;
    this.showCardFields = method === 'card';

    if (method === 'card') {
      this.paymentForm.get('cardName')?.setValidators([Validators.required]);
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.minLength(16)]);
      this.paymentForm.get('expiry')?.setValidators([Validators.required]);
      this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      this.paymentForm.get('cardName')?.clearValidators();
      this.paymentForm.get('cardNumber')?.clearValidators();
      this.paymentForm.get('expiry')?.clearValidators();
      this.paymentForm.get('cvv')?.clearValidators();
    }

    this.paymentForm.get('cardName')?.updateValueAndValidity();
    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expiry')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
  }



  purchase() {

    let idClient: number = this.user.id;
    this.order = {} as oreder;

    const formValues = this.firstFormGroup.getRawValue();
    const secondFormGroup = this.secondFormGroup.getRawValue();
    this.order.clientId = idClient as number;
    this.order.first_name = formValues.firstNameCtrl?.toString() ?? '';
    this.order.last_name = formValues.lastNameCtrl?.toString() ?? '';
    this.order.address = secondFormGroup.addressCtrl?.toString() ?? '';
    this.order.phone_number = secondFormGroup.phoneCtrl?.toString() ?? '';
    this.order.payment_method = this.paymentForm.get('method')?.value;
    this.order.status = OrderStatus.IN_PROCESS;


    this.dataService.getCartProductsSubject.subscribe(products => {

      for (const prod of products) {
        this.order.cart_elements += prod.productName + "--" + prod.amount + ";  ";
      }


    });


    this.placeOrder();


  }

  placeOrder() {
    if (this.order.cart_elements != null) {
      let idClient: number = this.user.id;

      of(null).pipe(
        concatMap(() => this.dataService.addOrder(this.order)),
        concatMap(() => this.dataService.deleteALLCartItems(idClient)),
        tap(() => this.dataService.getCartProduct(idClient)),
        tap(() => this.dataService.updateCartAmount())
      ).subscribe({
        next: () => console.log(' All steps completed'),
        error: (err) => console.error('Error:', err)
      });
    } else {
      alert("Cart emty")
    }
    alert("Thank you for your purchase!");
  }
}
