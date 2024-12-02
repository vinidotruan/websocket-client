import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading = false;
  private loadingService = inject(LoadingService);

  constructor() {
    this.loadingService.loading$.subscribe({
      next: stack => this.isLoading = stack.length >= 1
    })
  }
}
