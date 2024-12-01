import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MicroblogService {

  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  sendMessage(message: string): void {
    const headers = { 'content-type': 'application/json'};

    this.http
      .post<any>(`${this.url}/status`, {message: message}, { headers: headers})
      .subscribe(
        (response: any) => console.log("Success"),
        (error) => {
          console.error(error);
      });
  }
}
