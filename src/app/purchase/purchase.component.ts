import { Component, inject } from '@angular/core';
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

  total: any;
  paymentForm: FormGroup;
  showCardFields = false;
  canPurchase = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      method: [''],
      cardName: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });

    const nav = this.router.getCurrentNavigation();
    this.total = nav?.extras?.state?.['total'];
    
  }

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
    console.log('Purchase confirmed');
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
}
