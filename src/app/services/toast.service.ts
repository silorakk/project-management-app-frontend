import { Injectable } from '@angular/core';
import { Observable, Subject, firstValueFrom, of, timer } from 'rxjs';
import { v4 as uuid } from 'uuid';

type ToastVariant = 'success' | 'error';
export class Toast {
  readonly id = uuid();
  title: string;
  description: string | null;
  variant: ToastVariant;
  constructor(
    title: string,
    description: string | null,
    variant: ToastVariant
  ) {
    this.title = title;
    this.description = description;
    this.variant = variant;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  #toasts: Toast[] = [];
  #alertSubject = new Subject<Toast[]>();
  private _toasts$: Observable<Toast[]> | undefined;

  get toasts$(): Observable<Toast[]> {
    if (!this._toasts$) {
      this._toasts$ = this.#alertSubject.asObservable();
    }
    return this._toasts$;
  }

  showToast(
    title: string,
    description: string | null,
    variant: ToastVariant = 'success'
  ) {
    const newToast = new Toast(title, description, variant);

    firstValueFrom(timer(5000)).then(() => this.removeToast(newToast.id));

    this.#addToast(newToast);
  }

  #addToast(toast: Toast) {
    this.#toasts.push(toast);
    this.#alertSubject.next(this.#toasts);
  }

  removeToast(id: string) {
    this.#toasts = this.#toasts.filter((toast) => toast.id !== id);
    this.#alertSubject.next(this.#toasts);
  }
}
