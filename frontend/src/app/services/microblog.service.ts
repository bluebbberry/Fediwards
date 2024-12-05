import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Sidekick } from "../model/sidekick";

@Injectable({
  providedIn: 'root'
})
export class MicroblogService {
  private url: string = "http://localhost:3000";
  public statuses?: any[];

  constructor(private http: HttpClient) { }

  sendMessage(message: string, sidekick: Sidekick, onSuccess: any): void {
    const headers = { 'content-type': 'application/json'};

    this.http
      .post<any>(`${this.url}/status`, {message: message, sidekick: sidekick.name}, { headers: headers})
      .subscribe(
        (response: any) => {
          console.log("Success");
          onSuccess();
        },
        (error) => {
          console.error(error);
          onSuccess();
      });
  }

  fetchStatuses() {
    this.statuses = undefined;
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      this.statuses = response["requestBody"];
    });
  }

  getDescendantsOfPost(messageId: string) {
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses/${messageId}/children`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      this.statuses = response["requestBody"];
    });
  }
}
