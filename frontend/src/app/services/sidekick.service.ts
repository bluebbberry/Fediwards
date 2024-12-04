import { Injectable } from '@angular/core';
import {Sidekick} from "../model/sidekick";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SidekickService {
  private COOKIE_CHOSE_SIDEKICK: string = "choseSidekick";
  private COOKIE_EXPIRE_DAYS: number = 30;

  private allSidekicks: Sidekick[] = [
    new Sidekick("larry", "Larry", "Larry - Default Text Posting", "larry.png"),
    new Sidekick("spark", "Spark", "Spark - Angry Mode (Turns Every Post Into CAPS!!!)", "spark.png"),
    new Sidekick("jea", "Jea", "Jea - Schedule posts by starting post with #numberOfMinutes", "jea2.png"),
    //new Sidekick("flash", "Flash", "Flash - Allows to program conditional replies"),
    // new Sidekick("ava", "Ava", "Ava - Text Posting Plus Sparkly Commands"),
    // new Sidekick("legion", "Legion", "Legion - Reply to many people at once and send posts in great amount")
  ];
  private selectedSidekick: Sidekick;
  public hasUserChosenSidekick: boolean;

  constructor(private cookieService: CookieService) {
    debugger
    const sideKickCookieVal: string = this.cookieService.get(this.COOKIE_CHOSE_SIDEKICK);
    this.hasUserChosenSidekick = sideKickCookieVal !== '';
    if (this.hasUserChosenSidekick) {
      this.selectedSidekick = this.getByName(sideKickCookieVal);
    } else {
      // default sidekick
      this.selectedSidekick = this.allSidekicks[0];
      this.cookieService.set(this.COOKIE_CHOSE_SIDEKICK, this.selectedSidekick.name, this.COOKIE_EXPIRE_DAYS);
    }
  }

  public getByName(name: string): Sidekick {
    const result = this.allSidekicks.find(s => s.name === name);
    if (result) return result;
    else {
      throw Error("Unknown sidekick name: " + name);
    }
  }

  public getAllSidekicks() {
    return this.allSidekicks;
  }

  public setSelectedSidekick(sidekick: Sidekick) {
    this.selectedSidekick = sidekick;
    this.hasUserChosenSidekick = true;
    this.cookieService.set(this.COOKIE_CHOSE_SIDEKICK, sidekick.name, this.COOKIE_EXPIRE_DAYS);
  }

  public getSelectedSidekick() {
    return this.selectedSidekick;
  }
}
