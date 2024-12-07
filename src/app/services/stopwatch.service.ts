import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  trigger: any;
  interval = interval();
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  stopwatchBehavior = new BehaviorSubject<string>("00:00:00");
  stopwatch$: Observable<string> = this.stopwatchBehavior.asObservable();

  constructor() { }

  start(timer: number): void {
    console.log(this.hours, this.minutes)
    this.interval = interval(0.5);
    let { hours, minutes } = this.getHoursAndMinutes(timer);
    let seconds = 0;
    this.hours = hours;
    this.minutes = minutes;
    this.trigger = this.interval.subscribe({
      next: _  => {
        if(seconds === 0 && minutes === 0 && hours === 0) {
          this.stop();
          return;
        }
        if(seconds == 0 && minutes == 0) {
          if(hours > 0) {
            hours--;
          }
          minutes = this.minutes != 0 ? 59 : this.minutes;
          seconds = 59;
        } else if (seconds == 0) {
          seconds = 59;
          if(minutes > 0) {
            minutes--;
          }
        } else {
          seconds--;
        }
        this.stopwatchBehavior.next(this.getFormattedTimer(hours, minutes, seconds));
      }
    })
  }

  stop(): void {
    this.trigger.unsubscribe();
    this.stopwatchBehavior.next(this.getFormattedTimer(this.hours, this.minutes, 0));
    // this.minutes = 0;
    // this.seconds = 0;
    // this.hours = 0;
  }

  getHoursAndMinutes(minutes: number): { hours: number, minutes: number }{
    if(minutes < 60) {
      return {hours:0, minutes: minutes};
    }
    const hours = minutes/60;
    const intHours = Math.floor(hours);
    return { hours: intHours, minutes: (hours - intHours)*60 };
  }

  getFormattedTimer(hours: number, minutes: number, seconds: number): string {
    return `${ this.formatTo2Digits(hours) }:`
      +`${ this.formatTo2Digits(minutes) }:`
       +`${ this.formatTo2Digits(seconds) }`
  }

  private formatTo2Digits(time: number) {
    return time >= 10 ? time : `0${time}`;
  }
}
