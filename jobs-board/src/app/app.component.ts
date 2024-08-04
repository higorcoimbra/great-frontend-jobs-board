import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobService } from '../services/job.service';
import { mergeAll, mergeMap, Observable, of, take, tap, toArray } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Job } from '../entities/job';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  jobIds$: Observable<string[]>;
  jobs$: Observable<Job[]>;
  initialJobs: Job[];
  jobsPageSize = 6;

  constructor(private jobService: JobService) {
    this.initialJobs = [];
    this.jobIds$ = this.jobService.getJobIds();
    this.jobs$ = this.jobIds$.pipe(
      mergeAll(),
      take(this.jobsPageSize),
      mergeMap(id => this.jobService.getJobById(id)),
      toArray(),
      tap(jobs => this.initialJobs = jobs)
    );
  }

  loadMore() {
    this.jobsPageSize = this.jobsPageSize + 6;
    this.jobs$ = this.jobIds$.pipe(
      mergeAll(),
      take(this.jobsPageSize),
      mergeMap(id => this.jobService.getJobById(id)),
      toArray()
    );
  }
}
