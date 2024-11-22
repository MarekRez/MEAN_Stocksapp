import { Component } from '@angular/core';
import {MENU_ITEMS} from '../../configurations/menu.config';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  brand = 'FHI Online Banking';
  menuItems = MENU_ITEMS;

}
