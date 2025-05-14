import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { DataService } from '../services/data.service';

/**
 * @title Input with error messages
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
})
export class HomeComponent {
  constructor(readonly router: Router, private dataService: DataService){

  }

  loginForm= new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9) ]),
    passwordFormControl: new FormControl('', [Validators.required,Validators.minLength(8)]),
  })

  redirectToRegister(){
    this.router.navigateByUrl("/register");
  }

 

  loginButton(){
    this.dataService.verifyLogIn(
      this.loginForm.value.emailFormControl?.toString() || '' ,
      this.loginForm.value.passwordFormControl?.toString() || ''
    )
    
  }

}