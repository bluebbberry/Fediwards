// start-page.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  standalone: true,
  imports: []
})
export class StartPageComponent {
  constructor(private router: Router) {}

  clickedOnStart() {
    this.router.navigate(['chat']);
  }
}
