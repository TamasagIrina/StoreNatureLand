import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from '../home.component';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private database: DataService, protected router: Router) {
  }
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  registerButton() {
    this.database.addUser(this.registerForm.value as Omit<User, 'id,role'>)
      .subscribe({
        next: (res) => {
          if (res === "User added") {
            alert('Account created!');
            this.database.getUser(this.registerForm.get('email')?.value || '');

            setTimeout(() => this.router.navigateByUrl('mainPage/store'), 100);
          } else {
            alert('Account allredy exist! Please enter anoder accont.');
          }

        },
        error: (err) => {
          console.error('Error:', err);
          alert('Registration failed!');
        }
      });



  }
}


