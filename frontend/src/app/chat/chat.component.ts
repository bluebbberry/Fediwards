import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgFor} from '@angular/common';
import { MicroblogService } from "../services/microblog.service";
import { SidekickService } from "../services/sidekick.service";
import {Sidekick} from "../model/sidekick";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ FormsModule, CommonModule, NgFor ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string = '';
  selectedSidekick!: Sidekick;

  constructor(private http: HttpClient, protected microblogService: MicroblogService, protected sidekickService: SidekickService) {
    this.selectedSidekick = this.sidekickService.getSelectedSidekick();
    this.microblogService.fetchStatuses();
  }

  sendToMyAccount() {
    console.log("Clicked on send");
    if (this.newMessage) {
      this.microblogService.sendMessage(this.newMessage, this.sidekickService.getSelectedSidekick(), () => {
        this.microblogService.fetchStatuses();
      });
    } else {
      alert("Failed to send a message");
    }
  }

  onChange(value: string) {
    this.sidekickService.setSelectedSidekick(this.sidekickService.getByName(value));
  }
}
