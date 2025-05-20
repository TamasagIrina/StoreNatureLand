import { Component, Input } from '@angular/core';
import { oreder } from '../../interfaces/order.interface';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-order',
  imports: [MatCardModule,MatInputModule,MatIconModule, MatButtonModule,FormsModule, CommonModule],
  templateUrl: './table-order.component.html',
  styleUrl: './table-order.component.scss'
})
export class TableOrderComponent {
 @Input() order!:oreder;
}
