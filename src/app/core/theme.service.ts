import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly dark = signal(this.readInitialTheme());

  constructor() {
    this.apply(this.dark());
  }

  toggle(): void {
    this.dark.update((value) => !value);
    this.apply(this.dark());
  }

  private readInitialTheme(): boolean {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  }

  private apply(dark: boolean): void {
    this.document.documentElement.dataset['theme'] = dark ? 'dark' : 'light';
    try {
      localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
    } catch {
      // Ignore blocked storage.
    }
  }
}
