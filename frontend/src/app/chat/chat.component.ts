import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MicroblogService } from "../services/microblog.service";
import { SidekickService } from "../services/sidekick.service";

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

  selectedValue?: string;

  constructor(private http: HttpClient, private microblogService: MicroblogService, private sidekickService: SidekickService) {
    this.selectedValue = this.sidekickService.selectedSidekick;
  }

  sendToMyAccount() {
    console.log("Clicked on send");
    if (this.newMessage) {
      this.microblogService.sendMessage(this.newMessage, this.sidekickService.selectedSidekick!);
    } else {
      alert("Failed to send a message");
    }
  }

  onChange(value: string) {
    this.sidekickService.selectedSidekick = value;
  }
}
