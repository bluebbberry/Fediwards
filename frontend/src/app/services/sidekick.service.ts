import { Injectable } from '@angular/core';
import {Sidekick} from "../model/sidekick";

@Injectable({
  providedIn: 'root'
})
export class SidekickService {
  private allSidekicks: Sidekick[] = [
    new Sidekick("larry", "Larry"),
    new Sidekick("ava", "Ava"),
    new Sidekick("spark", "Spark"),
    new Sidekick("flash", "Flash"),
    new Sidekick("jea", "Jea"),
    new Sidekick("legion", "Legion")
  ];
  public selectedSidekick: string;

  constructor() {
    this.selectedSidekick = this.allSidekicks[0].name;
  }

  getByName(name: string) {
    return this.allSidekicks.find(s => s.name === name);
  }
}
