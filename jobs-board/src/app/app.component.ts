import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobService } from '../services/job.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  jobIds$: Observable<string[]>;

  constructor(jobService: JobService) {
    this.jobIds$ = jobService.getJobIds();
  }
}
