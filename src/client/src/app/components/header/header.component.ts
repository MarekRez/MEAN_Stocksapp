import { Component } from '@angular/core';
import {MENU_ITEMS} from '../../configurations/menu.config';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  standalone: true
})
export class HeaderComponent {
  brand = 'StocksByMarek';
  menuItems = MENU_ITEMS;

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
