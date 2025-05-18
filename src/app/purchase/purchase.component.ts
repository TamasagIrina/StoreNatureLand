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
import { OrderStatus } from '../interfaces/orderStatus.interfac';
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
    MatIconModule
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {

  @Input() order!: oreder;

  paymentForm: FormGroup;
  showCardFields = false;
  canPurchase = false;

  constructor(private fb: FormBuilder, private router: Router, protected dataService: DataService) {
    this.paymentForm = this.fb.group({
      method: [''],
      cardName: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });



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
    this.canPurchase = method === 'cash';

    if (method === 'Card') {
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

    this.paymentForm.updateValueAndValidity();
  }

  purchase() {
    this.order = {
      id: 0,
      id_client: 0,
      first_name: '',
      last_name: '',
      address: '',
      phone_number: '',
      cart_elements: '',
      payment_method: '',
      status: OrderStatus.IN_PROCESS
    };

    let idClient: number = localStorage.getItem('id') as unknown as number;
    const formValues = this.firstFormGroup.getRawValue();
    const secondFormGroup = this.secondFormGroup.getRawValue();
    this.order.id_client = idClient;
    this.order.first_name = formValues.firstNameCtrl?.toString() ?? '';
    this.order.last_name = formValues.lastNameCtrl?.toString() ?? '';
    this.order.address = secondFormGroup.addressCtrl?.toString() ?? '';
    this.order.phone_number = secondFormGroup.phoneCtrl?.toString() ?? '';
    this.order.payment_method= this.paymentForm.get('method')?.value;

    
    this.dataService.getCartProductsSubject.subscribe(products => {
     
      for (const prod of products) {
        this.order.cart_elements+=prod.productName+"--"+prod.amount+";  ";
      }
      console.log(this.order);
      
    });
    this.dataService.addOrder(this.order);

  }
}
