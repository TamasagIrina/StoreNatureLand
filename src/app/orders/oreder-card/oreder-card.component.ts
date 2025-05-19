import { Component, Input } from '@angular/core';
import { oreder } from '../../interfaces/order.interface';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-oreder-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './oreder-card.component.html',
  styleUrl: './oreder-card.component.scss'
})
export class OrederCardComponent {
  @Input() order!: oreder;

  constructor(protected dataService: DataService) { }

 async  deportedButton() {
    this.dataService.updateStatusOrder(this.order.id);

    await new Promise(resolve => setTimeout(resolve, 300));

    this.dataService.getAllOrders();
  }
}
