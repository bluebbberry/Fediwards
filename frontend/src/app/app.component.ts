import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient) {}

  sendToMyAccount() {
    console.log("Clicked on send");
    this.http
      .get("http://localhost:3000/status").subscribe((response: any) => console.log("Success"));
  }
}
