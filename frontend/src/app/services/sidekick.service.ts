import {Injectable} from '@angular/core';
import {Sidekick} from "../model/sidekick";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SidekickService {
  private COOKIE_CHOSE_SIDEKICK: string = "choseSidekick";
  private COOKIE_EXPIRE_DAYS: number = 30;

  private allSidekicks: Sidekick[] = [
    new Sidekick("larry", "Larry", "Larry - Classic Text Posting", "larry.png"),
    new Sidekick("jea", "Jea", "Jea - Schedule posts by starting post with #numberOfMinutes", "jea2.png"),
    new Sidekick("ennui", "Ennui", "Ennui - Laid-back, seemingly low-effort posts guaranteed", "slack.jpg"),
    new Sidekick("spark", "Spark", "Spark - Angry Mode (Turns Every Post Into CAPS!!!)", "spark2.png"),
    new Sidekick("hamlet", "Hamlet", "Hamlet - Ends every post with a Shakespeare quote", "hamlet.jpg"),
    new Sidekick("legion", "Legion", "Legion - Post the same post multiple times with #numberOfTimesPosted", "legion.jpg"),
    //new Sidekick("flash", "Flash", "Flash - Allows to program conditional replies"),
    // new Sidekick("ava", "Ava", "Ava - Text Posting Plus Sparkly Commands"),
  ];
  private selectedSidekick: Sidekick;
  public hasUserChosenSidekick: boolean;
  public sidekickQuickSelectionSet: any = {};

  constructor(private cookieService: CookieService) {
    const sideKickCookieVal: string = this.cookieService.get(this.COOKIE_CHOSE_SIDEKICK);
    this.hasUserChosenSidekick = sideKickCookieVal !== '';
    if (this.hasUserChosenSidekick) {
      this.selectedSidekick = this.getByName(sideKickCookieVal);
    } else {
      // default sidekick
      this.selectedSidekick = this.allSidekicks[0];
      this.cookieService.set(this.COOKIE_CHOSE_SIDEKICK, this.selectedSidekick.name, this.COOKIE_EXPIRE_DAYS);
    }

    this.allSidekicks.forEach(sidekick => {this.sidekickQuickSelectionSet[sidekick.name] = false;})
    this.loadSidekickQuickSelectionFromCookie();
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

  public getAllSidekicksInQuickSelectionSet(): Sidekick[] {
    const result : Sidekick[] = [];
    for (const sidekickName of Object.keys(this.sidekickQuickSelectionSet).filter(name => this.sidekickQuickSelectionSet[name] === true)) {
      const s = this.allSidekicks.find(s => s.name === sidekickName);
      if (s) result.push(s);
    }
    return result;
  }

  public setSelectedSidekick(sidekick: Sidekick) {
    this.selectedSidekick = sidekick;
    this.hasUserChosenSidekick = true;
    this.cookieService.set(this.COOKIE_CHOSE_SIDEKICK, sidekick.name, this.COOKIE_EXPIRE_DAYS);
  }

  public getSelectedSidekick() {
    return this.selectedSidekick;
  }

  public saveSidekickQuickSelectionToCookie() {
    this.cookieService.set("sidekickQuickSelection", JSON.stringify(Object.keys(this.sidekickQuickSelectionSet).filter((name: string) => this.sidekickQuickSelectionSet[name] === true).join(";")), this.COOKIE_EXPIRE_DAYS);
  }

  public loadSidekickQuickSelectionFromCookie() {
    const sidekickQuickSelectionSet = this.cookieService.get("sidekickQuickSelection");
    if (sidekickQuickSelectionSet) {
      const selectedSidekickNames: string[] = JSON.parse(sidekickQuickSelectionSet).split(";");
      for (const name of selectedSidekickNames) {
        this.sidekickQuickSelectionSet[name] = true;
        const sidekick = this.allSidekicks.find((sidekick: Sidekick) => sidekick.name = name);
        if (sidekick) sidekick.selected = true;
      }
    }
  }
}
