import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const currentTheme = localStorage.getItem(this.themeKey) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    localStorage.setItem(this.themeKey, newTheme);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.applyTheme(savedTheme);
  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
