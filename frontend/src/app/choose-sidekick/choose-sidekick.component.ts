import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidekickService} from "../services/sidekick.service";
import {CookieService} from "ngx-cookie-service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

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
  private COOKIE_CHOSE_SIDEKICK: string = "choseSidekick";
  private COOKIE_EXPIRE_DAYS: number = 30;

  constructor(private router: Router, protected sidekickService: SidekickService, private cookieService: CookieService) {}

  clickedOnStart() {
    this.router.navigate(['chat']);
  }

  onChange(value: string) {
    this.sidekickService.selectedSidekick = value;
    this.cookieService.set(this.COOKIE_CHOSE_SIDEKICK, value, this.COOKIE_EXPIRE_DAYS);
  }
}
