import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { TableOrderComponent } from "./table-order/table-order.component";
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [TableOrderComponent, AsyncPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  

  
  constructor(protected dataService: DataService) {

  }

   email: any= localStorage.getItem('email');
 

  ngOnInit() {
    this.dataService.getOrdesById(localStorage.getItem('id') as unknown as number);
   
  }

}
