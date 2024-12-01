import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MicroblogService} from "../services/microblog.service";

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

  constructor(private http: HttpClient, private microblogService: MicroblogService) { }

  sendToMyAccount() {
    console.log("Clicked on send");
    this.microblogService.sendMessage("Test");
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage.trim());
      this.newMessage = '';
    }
  }
}
