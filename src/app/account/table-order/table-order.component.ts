import { Component, Input } from '@angular/core';
import { oreder } from '../../interfaces/order.interface';

@Component({
  selector: 'app-table-order',
  imports: [],
  templateUrl: './table-order.component.html',
  styleUrl: './table-order.component.scss'
})
export class TableOrderComponent {
 @Input() oreder!:oreder;
}
