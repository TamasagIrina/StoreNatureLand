import { Component, Input } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import { oreder } from '../interfaces/order.interface';

@Component({
  selector: 'app-orders',
  imports: [MatTabsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  @Input() order!: oreder;
  
 ngOnInit(){
    
 }



}