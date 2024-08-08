import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  template: `
   @if(errorMessage) {
    <div class="error-message">
        {{ errorMessage }} 
    </div>
    } 
  `,
  styles: [`
    .error-message {
      background-color: #f8d7da;
      color: #721c24;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      width: 200px;
      margin: 0 auto;
    }
  `
  ]
})
export class ErrorDisplayComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private errorSubscription: Subscription | null = null;

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorSubscription = this.errorService.errors$.subscribe(
      error => {
        this.errorMessage = error;
        setTimeout(() => this.errorMessage = null, 5000);
      });
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }
}