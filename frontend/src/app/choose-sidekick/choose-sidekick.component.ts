import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-sidekick',
  standalone: true,
  imports: [],
  templateUrl: './choose-sidekick.component.html',
  styleUrl: './choose-sidekick.component.scss'
})
export class ChooseSidekickComponent {
  constructor(private router: Router) {}

  clickedOnStart() {
    this.router.navigate(['chat']);
  }
}
