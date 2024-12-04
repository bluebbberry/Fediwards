import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidekickService} from "../services/sidekick.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Sidekick} from "../model/sidekick";

@Component({
  selector: 'app-choose-sidekick',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './choose-sidekick.component.html',
  styleUrl: './choose-sidekick.component.scss'
})
export class ChooseSidekickComponent {
  constructor(private router: Router, protected sidekickService: SidekickService) {
    sidekickService.setSelectedSidekick(sidekickService.getAllSidekicks()[0]);
  }

  clickedOnStart() {
    this.router.navigate(['chat']);
  }

  onSidekickSelect(sidekick: Sidekick) {
    this.sidekickService.setSelectedSidekick(sidekick);
  }
}
