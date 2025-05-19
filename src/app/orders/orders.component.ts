import { Component, Input } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { oreder } from '../interfaces/order.interface';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';
import { OrederCardComponent } from "./oreder-card/oreder-card.component";
import { AsyncPipe } from '@angular/common';
import { OrderStatus } from '../interfaces/orderStatus.interfac';

@Component({
  selector: 'app-orders',
  imports: [MatTabsModule, OrederCardComponent, AsyncPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {


  @Input() orderStatus!: OrderStatus

  constructor(protected dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllOrders();
  }



}