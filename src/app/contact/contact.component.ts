import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { message } from '../interfaces/message.interface';
import { tick } from '@angular/core/testing';
import { messageStatus } from '../interfaces/messageStatus.interface';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-contact',
  imports: [MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @Input() message!: message;

  constructor(protected dataService: DataService) { }

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    message: new FormControl('', Validators.required)
  });

  sendButton() {
    this.message = {} as message;

    this.message.firstName = this.contactForm.get('firstName')?.value || "";
    this.message.lastName = this.contactForm.get('lastName')?.value || "";
    this.message.email = this.contactForm.get('email')?.value || "";
    this.message.phoneNumber = this.contactForm.get('phone')?.value || "";
    this.message.message = this.contactForm.get('message')?.value || "";
    this.message.messageStatus = messageStatus.WAITING;

    console.log(this.message)

    this.dataService.addMessage(this.message).subscribe({
      next: response => {
        alert( response);
      },
      error: err => {
        console.error('Failed to send message:', err);
      }
    });


  }

}
