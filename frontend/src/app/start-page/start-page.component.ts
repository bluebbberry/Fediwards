// start-page.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidekickService} from "../services/sidekick.service";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  standalone: true,
  imports: []
})
export class StartPageComponent {
  private COOKIE_CHOSE_SIDEKICK: string = "choseSidekick";
  private choseSidekick: boolean = false;

  constructor(private router: Router, private cookieService: CookieService, private sidekickService: SidekickService) {
    const sideKickVal: string = this.cookieService.get(this.COOKIE_CHOSE_SIDEKICK);
    this.choseSidekick = sideKickVal !== '';
    if (this.choseSidekick) {
      this.sidekickService.selectedSidekick = sideKickVal;
    }
  }

  clickedOnStart() {
    if (this.choseSidekick) {
      this.router.navigate(['chat']);
    } else {
      this.router.navigate(['choose-sidekick']);
    }
  }

  welcomeText() {
    if (this.choseSidekick) {
      return "Welcome back, says " + this.sidekickService.selectedSidekick;
    } else {
      // first time
      return "Welcome, Trainer!";
    }
  }

  confirmBtnText() {
    if (this.choseSidekick) {
      return "Start";
    } else {
      // first time
      return "Choose my first Sidekick";
    }
  }
}
