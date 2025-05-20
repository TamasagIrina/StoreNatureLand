import { Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { message } from '../../interfaces/message.interface';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card-message',
  imports: [MatProgressBarModule,MatCardModule,MatChipsModule, CommonModule],
  templateUrl: './card-message.component.html',
  styleUrl: './card-message.component.scss'
})
export class CardMessageComponent {
  @Input() messages!: message;

  constructor(private dataService:DataService){

  }

  async answeredButton(){
    this.dataService.updateStatusMessage(this.messages.id);

    await new Promise(resolve => setTimeout(resolve, 300));

    this.dataService.getMessages();
  }
}
