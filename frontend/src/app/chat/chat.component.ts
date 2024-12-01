import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MicroblogService} from "../services/microblog.service";
import {SidekickService} from "../services/sidekick.service";

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

  constructor(private http: HttpClient, private microblogService: MicroblogService, private sidekickService: SidekickService) { }

  sendToMyAccount() {
    console.log("Clicked on send");
    this.microblogService.sendMessage(this.newMessage, this.sidekickService.selectedSidekick!);
  }

  onChange(value: string) {
    this.sidekickService.selectedSidekick = value;
  }
}
