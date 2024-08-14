import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<string | null>();
  errors$ = this.errorSubject.asObservable();

  showError(message: string) {
    this.errorSubject.next(message);
    console.log('log:', message);
  }

  clearError() {
    this.errorSubject.next(null);
  }
}