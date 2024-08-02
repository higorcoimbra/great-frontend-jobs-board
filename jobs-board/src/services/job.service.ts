import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class JobService {
  constructor(private http: HttpClient) {}

  getJobIds() {
    return this.http.get<string[]>('https://hacker-news.firebaseio.com/v0/jobstories.json');
  }
}
