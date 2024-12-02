import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidekickService {
  public selectedSidekick: string = "larry";

  constructor() { }
}
