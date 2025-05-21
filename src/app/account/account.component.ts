import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { TableOrderComponent } from "./table-order/table-order.component";
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-account',
  imports: [TableOrderComponent,
    AsyncPipe,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {



  constructor(protected dataService: DataService) {

  }
  user = {
    firstName: 'Ryan',
    lastName: 'Gosling',
    username: 'Sebastian',
    email: 'ryan876@gmail.com',
    password: '************'
  };
  email: any = localStorage.getItem('email');


  ngOnInit() {
    this.dataService.getOrdesById(localStorage.getItem('id') as unknown as number);

  }

}
