import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MicroblogService } from "../services/microblog.service";
import { SidekickService } from "../services/sidekick.service";
import {CookieService} from "ngx-cookie-service";

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
  private COOKIE_CHOSE_SIDEKICK: string = "choseSidekick";
  private COOKIE_EXPIRE_DAYS: number = 30;

  selectedValue?: string;

  constructor(private http: HttpClient, private microblogService: MicroblogService, private sidekickService: SidekickService, private cookieService: CookieService) {
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
    this.cookieService.set(this.COOKIE_CHOSE_SIDEKICK, value, this.COOKIE_EXPIRE_DAYS);
  }
}
