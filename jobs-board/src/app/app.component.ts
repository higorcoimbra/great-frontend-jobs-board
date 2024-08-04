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
  initialJobs$: Observable<Job[]>;

  constructor(private jobService: JobService) {
    this.jobIds$ = this.jobService.getJobIds();
    this.initialJobs$ = this.jobIds$.pipe(
      mergeAll(),
      take(6),
      mergeMap(id => this.jobService.getJobById(id)),
      toArray()
    );
  }

  loadMore() {
    console.log('load more works!');
  }
}
