import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { MatTabsModule } from '@angular/material/tabs';
import { AsyncPipe } from '@angular/common';
import { CardMessageComponent } from "./card-message/card-message.component";



@Component({
  selector: 'app-get-messages',
  imports: [CommonModule, MatTabsModule, AsyncPipe, CardMessageComponent],
  templateUrl: './get-messages.component.html',
  styleUrl: './get-messages.component.scss'
})
export class GetMessagesComponent {
  constructor(protected dataService: DataService) {

  }
  ngOnInit() {
    this.dataService.getMessages();
   
  }
}