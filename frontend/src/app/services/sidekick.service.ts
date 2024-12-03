import { Injectable } from '@angular/core';
import {Sidekick} from "../model/sidekick";

@Injectable({
  providedIn: 'root'
})
export class SidekickService {
  private allSidekicks: Sidekick[] = [
    new Sidekick("larry", "Larry", "Larry - Default Text Posting"),
    new Sidekick("spark", "Spark", "Spark - Angry Mode (Turns Every Post Into CAPS!!!)"),
    new Sidekick("jea", "Jea", "Jea - Schedule posts by starting post with #numberOfMinutes"),
    //new Sidekick("flash", "Flash", "Flash - Allows to program conditional replies"),
    // new Sidekick("ava", "Ava", "Ava - Text Posting Plus Sparkly Commands"),
    // new Sidekick("legion", "Legion", "Legion - Reply to many people at once and send posts in great amount")
  ];
  public selectedSidekick: string;

  constructor() {
    this.selectedSidekick = this.allSidekicks[0].name;
  }

  public getByName(name: string) {
    return this.allSidekicks.find(s => s.name === name);
  }

  public getAllSidekicks() {
    return this.allSidekicks;
  }
}
