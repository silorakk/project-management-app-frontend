import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Toast, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  @Input({ required: true }) title = '';
  @Input() description: string | null = null;

  toasts$: Observable<Toast[]>;

  constructor(private _toastService: ToastService) {
    this.toasts$ = this._toastService.toasts$;
  }
}
