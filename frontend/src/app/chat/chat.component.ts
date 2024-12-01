import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string = '';

  constructor(private http: HttpClient) {}

  sendToMyAccount() {
    console.log("Clicked on send");
    this.http
      .get("http://localhost:3000/status", { responseType: 'text' })
      .subscribe((response: any) => console.log("Success"), (error) => {
        console.error(error);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage.trim());
      this.newMessage = '';
    }
  }
}
