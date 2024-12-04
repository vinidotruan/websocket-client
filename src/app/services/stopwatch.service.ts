import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  trigger;
  interval = interval();
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  stopwatchBehavior = new BehaviorSubject<string>("00:00:00");
  stopwatch$: Observable<string> = this.stopwatchBehavior.asObservable();

  constructor() { }

  start(): void {
    this.interval = interval(1000);
    this.trigger = this.interval.subscribe({
      next: second => {
        if (this.seconds == 60) {
          this.minutes++;
          this.seconds = 0;
        } else if(this.minutes == 60) {
          this.minutes = 0;
          this.hours++;
        } else {
          this.seconds++;
        }
        this.stopwatchBehavior.next(
          `${this.hours >= 10 ? this.hours : '0'+this.hours}:${this.minutes >= 10 ? this.minutes : '0'+this.minutes}:${this.seconds >= 10 ? this.seconds : '0'+this.seconds}`
        )
      }
    })
  }

  stop(): void {
    this.trigger.unsubscribe();
    this.minutes = 0;
    this.seconds = 0;
    this.hours = 0;
  }
}
