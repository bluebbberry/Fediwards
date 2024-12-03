import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Sidekick} from "../model/sidekick";

@Injectable({
  providedIn: 'root'
})
export class MicroblogService {

  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  sendMessage(message: string, sidekick: string): void {
    const headers = { 'content-type': 'application/json'};

    this.http
      .post<any>(`${this.url}/status`, {message: message, sidekick: sidekick}, { headers: headers})
      .subscribe(
        (response: any) => console.log("Success"),
        (error) => {
          console.error(error);
      });
  }

  getStatuses() {
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
    });
  }
}
