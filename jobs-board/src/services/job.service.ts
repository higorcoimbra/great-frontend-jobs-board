import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Job } from "../entities/job";

@Injectable({providedIn: 'root'})
export class JobService {
  constructor(private http: HttpClient) {}

  getJobIds() {
    return this.http.get<string[]>('https://hacker-news.firebaseio.com/v0/jobstories.json');
  }

  getJobById(id: string) {
    return this.http.get<Job>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  }
}
