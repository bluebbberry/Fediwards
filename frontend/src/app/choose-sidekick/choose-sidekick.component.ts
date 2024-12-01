import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidekickService} from "../services/sidekick.service";

@Component({
  selector: 'app-choose-sidekick',
  standalone: true,
  imports: [],
  templateUrl: './choose-sidekick.component.html',
  styleUrl: './choose-sidekick.component.scss'
})
export class ChooseSidekickComponent {
  constructor(private router: Router, private sidekickService: SidekickService) {}

  clickedOnStart() {
    this.router.navigate(['chat']);
  }

  onChange(value: any) {
    this.sidekickService.selectedSidekick = value;
  }
}
