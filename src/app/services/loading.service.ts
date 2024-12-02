import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingStack: boolean[] = [];
  loadingBehavior = new BehaviorSubject<boolean[]>([]);
  loading$ = this.loadingBehavior.asObservable();
  constructor() { }

  setLoading() {
    this.loadingStack.push(true);
    this.loadingBehavior.next(this.loadingStack);
  }

  removeLoading() {
    this.loadingStack.pop();
    this.loadingBehavior.next(this.loadingStack);
  }
}
