import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  trigger: Subscription;
  interval: Observable<number>;
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  stopwatchBehavior = new BehaviorSubject<string>("00:00:00");
  stopwatch$: Observable<string> = this.stopwatchBehavior.asObservable();

  start(timer: number): void {
    let { hours, minutes } = this.getHoursAndMinutes(timer);
    let seconds = 0;
    this.hours = hours;
    this.minutes = minutes;
    this.trigger = this.stopwatchRules(seconds, minutes, hours)
  }

  stop(): void {
    if (this.trigger) {
      this.trigger.unsubscribe();
      this.trigger = undefined;
      this.stopwatchBehavior.next(this.getFormattedTimer(this.hours, this.minutes, 0));
    } else {
      console.log("chamou mais de uma vez");
    }
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

  private stopwatchRules(seconds: number, minutes: number, hours: number): Observable{
    const inter = interval(1);
  }
}
