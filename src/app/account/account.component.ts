import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { TableOrderComponent } from "./table-order/table-order.component";
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  imports: [TableOrderComponent,
    AsyncPipe,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  @Input() userInterface!: User;

  constructor(protected dataService: DataService, private router: Router) {

  }
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };


 profil:User = JSON.parse(localStorage.getItem('user') || "") as User;


  ngOnInit() {
    
    this.dataService.getOrdesById(this.profil.id);

  }
  seveButton() {
    let id = this.profil.id;
    this.userInterface = {} as User;
    this.userInterface.first_name = this.user.firstName;
    this.userInterface.last_name = this.user.lastName;
    this.userInterface.email = this.user.email;
    this.userInterface.password = this.user.password;
    

    this.dataService.updateUser(id, this.userInterface);

     setTimeout(() =>     window.location.reload(), 100);


    

    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

   

  }

  cancelButton() {  
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }
}
