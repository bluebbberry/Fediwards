import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidekickService} from "../services/sidekick.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {Sidekick} from "../model/sidekick";

@Component({
  selector: 'app-choose-sidekick',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './choose-sidekick.component.html',
  styleUrl: './choose-sidekick.component.scss'
})
export class ChooseSidekickComponent {
  constructor(private router: Router, protected sidekickService: SidekickService) {
    sidekickService.setSelectedSidekick(sidekickService.getAllSidekicks()[0]);
  }

  clickedOnStart() {
    this.sidekickService.saveSidekickQuickSelectionToCookie();
    this.router.navigate(['chat']);
  }

  onSidekickSelect(sidekick: Sidekick) {
    sidekick.selected = !sidekick.selected;
    const selectedCount = this.sidekickService.getAllSidekicks().filter(s => s.selected).length;
    if (selectedCount > 3) {
      sidekick.selected = false; // Deselect if limit exceeded
      alert("Selected more than 3 sidekicks");
    } else {
      if (sidekick.selected) {
        this.sidekickService.setSelectedSidekick(sidekick);
      } else if (this.sidekickService.getSelectedSidekick() == sidekick) {
        const randomSidekick = this.sidekickService.getRandomSidekickFromQuickSelectionSet();
        if (randomSidekick) {
          this.sidekickService.setSelectedSidekick(randomSidekick);
        } else {
          this.sidekickService.setSelectedSidekick(this.sidekickService.getAllSidekicks()[0]);
          this.sidekickService.getAllSidekicks()[0].selected = true;
        }
      }
      this.sidekickService.sidekickQuickSelectionSet[sidekick.name] = !this.sidekickService.sidekickQuickSelectionSet[sidekick.name];
    }
  }
}
