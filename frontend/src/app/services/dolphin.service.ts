import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DolphinService {

  private knowLedgeBase: any = {};
  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  fetchKnowledgeBase() {
    this.knowLedgeBase = undefined;
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/dolphin`, { headers: headers }).subscribe((response: any) => {
      this.knowLedgeBase = response["requestBody"];
      console.log("Received knowledge base:");
      console.log(response);
    });
  }
}
