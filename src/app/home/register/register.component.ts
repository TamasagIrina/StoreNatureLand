import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from '../home.component';


@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm= new FormGroup({
    firstNameFormControl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastNameFormControl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })



 

  registerButton(){
  
      alert("Accont exit! Go login!");
    
  }
}


