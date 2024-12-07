import {ChangeDetectorRef, Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgFor} from '@angular/common';
import { MicroblogService } from "../services/microblog.service";
import { SidekickService } from "../services/sidekick.service";
import {Sidekick} from "../model/sidekick";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {HomeFeedComponent} from "./home-feed/home-feed.component";
import {LocalFeedComponent} from "./local-feed/local-feed.component";
import {GlobalFeedComponent} from "./global-feed/global-feed.component";

enum Feed {
  HOME, LOCAL, GLOBAL
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, HomeFeedComponent, LocalFeedComponent, GlobalFeedComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string = '';
  selectedSidekick!: Sidekick;
  selectedStartValue: string;
  protected changed: boolean = false;
  public selectedFeed: Feed = Feed.HOME;

  constructor(private http: HttpClient, protected microblogService: MicroblogService, protected sidekickService: SidekickService, private router: Router, private changeDetectionRef: ChangeDetectorRef, protected userService: UserService) {
    if (!sidekickService.hasUserChosenSidekick) {
      router.navigate(['/']);
    }

    this.selectedSidekick = this.sidekickService.getSelectedSidekick();
    this.selectedStartValue = this.selectedSidekick.name;
    this.microblogService.fetchStatuses();
    this.userService.fetchUserInfo();
  }

  sendToMyAccount() {
    console.log("Clicked on send");
    if (this.newMessage) {
      this.microblogService.sendMessage(this.newMessage, this.sidekickService.getSelectedSidekick(), () => {
        this.microblogService.fetchStatuses();
      });
      this.newMessage = '';
    } else {
      alert("Failed to send a message");
    }
  }

  onChange(value: string) {
    this.sidekickService.setSelectedSidekick(this.sidekickService.getByName(value));
  }

  navigateTo(feed: Feed) {
    switch (feed) {
      case Feed.HOME:
        this.selectedFeed = Feed.HOME;
        break;
      case Feed.LOCAL:
        this.selectedFeed = Feed.LOCAL;
        break;
      case Feed.GLOBAL:
        this.selectedFeed = Feed.GLOBAL;
        break;
    }
  }

  clickedOnIcon() {
    this.router.navigate(['/']);
  }

  protected readonly Feed = Feed;

  clickedOnEditSidekickSelection() {
    this.router.navigate(['/choose-sidekick']);
  }
}
