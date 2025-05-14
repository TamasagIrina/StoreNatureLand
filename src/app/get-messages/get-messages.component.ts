import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-messages',
  imports: [MatProgressBarModule,MatCardModule, MatChipsModule, CommonModule ],
  templateUrl: './get-messages.component.html',
  styleUrl: './get-messages.component.scss'
})
export class GetMessagesComponent {


messages = [
  {
    title: 'Chihuahua',
    text: `The Chihuahua is a Mexican breed of toy dog...`,
    email: 'ion@gmail.com',
    phone: '0744543422'
  },
   {
    title: 'Chihuahua',
    text: `The Chihuahua is a Mexican breed of toy dog...`,
    email: 'ion@gmail.com',
    phone: '0744543422'
  },
   {
    title: 'Chihuahua',
    text: `The Chihuahua is a Mexican breed of toy dog...`,
    email: 'ion@gmail.com',
    phone: '0744543422'
  },
   {
    title: 'Chihuahua',
    text: `The Chihuahua is a Mexican breed of toy dog...`,
    email: 'ion@gmail.com',
    phone: '0744543422'
  },
   {
    title: 'Chihuahua',
    text: `The Chihuahua is a Mexican breed of toy dog...`,
    email: 'ion@gmail.com',
    phone: '0744543422'
  },

  {
    title: 'Chihuahua',
    text: `The Chihuahua is a Mexican breed of toy dog...`,
    email: 'ion@gmail.com',
    phone: '0744543422'
  },
  {
    title: 'Chihuahua',
    text: `The Chihuahua is a Mexican breed of toy dog...`,
    email: 'ion@gmail.com',
    phone: '0744543422'
  },
  // ... (alte obiecte dacă vrei mai multe carduri)
];
}
